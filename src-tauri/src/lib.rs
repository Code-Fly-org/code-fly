use tauri::{Manager, PhysicalSize};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }))
        .invoke_handler(tauri::generate_handler![])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let mut url = window.url().unwrap();
            url.set_path("/projectmanager.html");
            window.navigate(url).unwrap();
            window.set_resizable(false).unwrap();
            window.set_size(PhysicalSize::new(800, 600)).unwrap();
            window.set_title("Project Manager").unwrap();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
