import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import './Projects.css'

export default function Projects () {
  return (
    <>
      <div className='topbar'>
        <button
          onClick={async () => {
            const windowExists = await WebviewWindow.getByLabel(
              'new_project_popup'
            )
            if (windowExists) return
            const mainWindow = await WebviewWindow.getByLabel('main')
            if (!mainWindow) return
            const popup = new WebviewWindow('new_project_popup', {
              title: 'PHP Fly: New Project',
              url: '/newproject.html',
              width: 600,
              height: 500,
              resizable: false,
              maximizable: false,
              parent: mainWindow
            })
            await mainWindow.setClosable(false)
            await mainWindow.setEnabled(false)
            await popup.setFocus()
            popup.once('tauri://destroyed', async () => {
              await mainWindow.setEnabled(true)
              await mainWindow.setClosable(true)
              await mainWindow.setFocus()
            })
          }}
        >
          New Project
        </button>
        <button>Open</button>
        <button>Clone Repository</button>
      </div>
      <div className='content'></div>
    </>
  )
}
