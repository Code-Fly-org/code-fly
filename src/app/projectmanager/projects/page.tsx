'use client'

import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import './ProjecftManager_projects.css'
import { invoke } from '@tauri-apps/api/core'

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
            const projectManager = await WebviewWindow.getByLabel(
              'projectmanager'
            )
            if (!projectManager) return
            invoke('create_window', { windowType: 1 })
            const popup = await WebviewWindow.getByLabel('newprojectpopup')
            if (!popup) return
            await projectManager.setClosable(false)
            await projectManager.setEnabled(false)
            await popup.setFocus()
            popup.once('tauri://destroyed', async () => {
              await projectManager.setEnabled(true)
              await projectManager.setClosable(true)
              await projectManager.setFocus()
            })
          }}
        >
          New Project
        </button>
        <button>Open</button>
        <button>Clone Repository</button>
        <button
          onClick={async () => {
            const projectManager = await WebviewWindow.getByLabel(
              'projectmanager'
            )
            if (!projectManager) return
            invoke('create_window', { windowType: 2 })
            const editor = await WebviewWindow.getByLabel('editor')
            if (!editor) return
            projectManager.close()
          }}
        >
          dbg: open editor
        </button>
      </div>
      <div className='content'></div>
    </>
  )
}
