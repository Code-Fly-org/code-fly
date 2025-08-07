use tauri::Manager;
use tokio::fs;

#[tauri::command]
async fn create_project(project_type: String, project_folder: String, project_name: String) {
    let project_root: String = format!("{}/{}", project_folder, project_name);
    let _ = fs::create_dir(&project_root);

    let project_type_str: &str = project_type.as_str();
    match project_type_str {
        "website" => {
            let _ = fs::write(
                format!("{}/index.php", project_root),
                "<h1>this will be updated later</h1>",
            )
            .await;
        }

        "webserver" => {
            let _ = fs::write(
                format!("{}/index.php", project_root),
                "<h1>this will be updated later</h1>",
            )
            .await;
        }

        _ => {}
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }))
        .invoke_handler(tauri::generate_handler![create_project])
        .setup(|app| {
            tauri::webview::WebviewWindowBuilder::new(
                app,
                "main",
                tauri::WebviewUrl::App("projectmanager/projects".into()),
            )
            .resizable(false)
            .maximizable(false)
            .title("PHP Fly")
            .inner_size(800.0, 500.0)
            .build()?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
