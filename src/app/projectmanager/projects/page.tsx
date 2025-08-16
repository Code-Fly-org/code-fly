'use client'

import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import './ProjecftManager_projects.css'

export default function ProjectManager_Projects () {
  return (
    <>
      <div className='topbar'>
        <button
          onClick={async () => {
            const windowExists = await WebviewWindow.getByLabel(
              'newprojectpopup'
            )
            if (windowExists) return
            const mainWindow = await WebviewWindow.getByLabel('projectmanager')
            if (!mainWindow) return
            const popup = new WebviewWindow('newprojectpopup', {
              title: 'PHP Fly: New Project',
              url: '/newproject',
              width: 400,
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
