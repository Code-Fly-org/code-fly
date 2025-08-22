use serde_json::Value;
use std::{io::Cursor, path::Path};
use tauri::{AppHandle, Emitter, WebviewWindowBuilder};
use tauri_plugin_dialog::{DialogExt, MessageDialogKind};
use tokio::fs;
use zip::ZipArchive;

#[tauri::command]
fn create_window(app: AppHandle, window_type: i32, editor_folder: Option<String>) {
    match window_type {
        0 => {
            let _ = WebviewWindowBuilder::new(
                &app,
                "projectmanager",
                tauri::WebviewUrl::App("projectmanager/projects".into()),
            )
            .resizable(false)
            .maximizable(false)
            .title("PHP Fly: Project Manager")
            .inner_size(800.0, 500.0)
            .build();
        }
        1 => {
            let _ = WebviewWindowBuilder::new(
                &app,
                "newprojectpopup",
                tauri::WebviewUrl::App("newproject".into()),
            )
            .resizable(false)
            .maximizable(false)
            .title("PHP Fly: New Project")
            .inner_size(400.0, 500.0)
            .build();
        }
        2 => {
            let _ =
                WebviewWindowBuilder::new(&app, "editor", tauri::WebviewUrl::App(format!("editor?folder={}", editor_folder.unwrap()).into()))
                    .maximized(true)
                    .title("PHP Fly: Editor")
                    .inner_size(800.0, 600.0)
                    .min_inner_size(600.0, 400.0)
                    .build();
        }
        _ => {}
    }
}

#[tauri::command]
async fn create_project(
    app: AppHandle,
    project_type: String,
    project_folder: String,
    project_name: String,
) {
    let _ = app.emit("new_project_enable_creation_button", "false");
    let _ = app.emit("new_project_update_message", "white:Creating project...");

    let folder = Path::new(&project_folder);
    let name = Path::new(&project_name);
    let project_root = folder.join(name);
    let _ = fs::create_dir(&project_root).await;

    if project_type != "empty" {
        let _ = app.emit("new_project_update_message", "white:Fetching templates...");
        let url = format!(
            "https://codefly-repo.lncvrt.xyz/php-fly/templates/mainfest.php?onlyLatest=true&template={}",
            project_type
        );
        if let Ok(templates_res) = reqwest::get(url).await {
            if let Ok(json) = templates_res.json::<Value>().await {
                if let Some(templatedata) = json.get(&project_type) {
                    if let Some(latestdata) = templatedata.get("latest") {
                        if !latestdata.is_null() {
                            if let Some(latestdownloadurl) =
                                latestdata.get("download_url").and_then(|v| v.as_str())
                            {
                                let _ = app.emit(
                                    "new_project_update_message",
                                    "white:Downloading template...",
                                );
                                if let Ok(download_res) = reqwest::get(latestdownloadurl).await {
                                    match download_res.bytes().await {
                                        Ok(bytes) => {
                                            let _ = app.emit(
                                                "new_project_update_message",
                                                "white:Unzipping template...",
                                            );
                                            let result = tokio::task::spawn_blocking(
                                                move || -> anyhow::Result<()> {
                                                    let reader = Cursor::new(bytes);
                                                    let mut archive = ZipArchive::new(reader)?;

                                                    for i in 0..archive.len() {
                                                        let mut file = archive.by_index(i)?;
                                                        let outpath =
                                                            &project_root.join(file.name());

                                                        if file.is_dir() {
                                                            std::fs::create_dir_all(&outpath)?;
                                                        } else {
                                                            if let Some(parent) = outpath.parent() {
                                                                std::fs::create_dir_all(parent)?;
                                                            }
                                                            let mut outfile =
                                                                std::fs::File::create(&outpath)?;
                                                            std::io::copy(&mut file, &mut outfile)?;
                                                        }
                                                    }

                                                    Ok(())
                                                },
                                            )
                                            .await;

                                            match result {
                                                Ok(inner) => {
                                                    if let Err(e) = inner {
                                                        eprintln!("unzip failed: {:?}", e);
                                                    }
                                                }
                                                Err(e) => {
                                                    eprintln!("task panicked: {:?}", e);
                                                }
                                            }
                                        }
                                        Err(_) => {}
                                    }
                                } else {
                                    eprintln!("failed to download file");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    let _ = app.emit("new_project_enable_creation_button", "true");
    let _ = app.emit("new_project_update_message", "");
}

#[tauri::command]
fn read_dir(path: String) -> Vec<String> {
    let mut files = Vec::new();
    if let Ok(entries) = std::fs::read_dir(path) {
        for entry in entries.flatten() {
            if let Ok(file_name) = entry.file_name().into_string() {
                files.push(file_name.clone());
                println!("{}", file_name);
            }
        }
    }
    files
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            app.dialog()
                .message("PHP Fly is already open!")
                .kind(MessageDialogKind::Error)
                .title("Warning")
                .blocking_show();
        }))
        .invoke_handler(tauri::generate_handler![create_project, create_window, read_dir])
        .setup(|app| {
            let handle = app.handle();
            create_window(handle.clone(), 0, None);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
