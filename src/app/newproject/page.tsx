'use client'

import { useEffect, useState } from 'react'
import OptionButtons from '@/components/OptionButtons'
import './NewProject_page.css'
import { documentDir } from '@tauri-apps/api/path'
import { open } from '@tauri-apps/plugin-dialog'
import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { getCurrentWindow } from '@tauri-apps/api/window'

export default function NewProject_page () {
  const [projectType, setProjectType] = useState<string>('empty')
  const [projectFolder, setProjectFolder] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [creationButtonEnabled, setCreationButtonEnabled] =
    useState<boolean>(true)
  const [creationMessage, setCreationMessage] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const projPath = await documentDir()
      setProjectFolder(projPath)
      setLoading(false)
    })()

    const updateMessage = listen<string>('new_project_update_message', event =>
      setCreationMessage(event.payload)
    )

    const enableCreationButton = listen<string>(
      'new_project_enable_creation_button',
      async event => {
        getCurrentWindow().setClosable(event.payload == 'true')
        setCreationButtonEnabled(event.payload == 'true')
      }
    )

    return () => {
      updateMessage.then(f => f())
      enableCreationButton.then(f => f())
    }
  }, [setCreationMessage, setCreationButtonEnabled])

  return loading ? (
    <div className='flex justify-center items-center text-6xl h-screen w-screen'>
      <p>Loading</p>
    </div>
  ) : (
    <>
      <div className='justify-center mx-auto w-fit'>
        <div className='text-center mt-2'>
          <p className='-mb-4'>Project Name: </p>
          <input
            type='text'
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />

          <p className='-mb-4 mt-2'>Project Folder: </p>
          <input
            type='text'
            value={projectFolder}
            onChange={e => setProjectFolder(e.target.value)}
          />

          <button
            onClick={async () => {
              const folder = await open({
                multiple: false,
                directory: true,
                defaultPath: projectFolder
              })
              if (!folder) return
              setProjectFolder(folder)
            }}
          >
            Select folder
          </button>
        </div>

        <OptionButtons
          buttons={[
            <button
              key='emptybutton'
              onClick={() => setProjectType('empty')}
              className='projecttypebutton'
              disabled={projectType == 'empty'}
            >
              Empty
            </button>,
            <button
              key='websitebutton'
              onClick={() => setProjectType('website')}
              className='projecttypebutton'
              disabled={projectType == 'website'}
            >
              Website
            </button>,
            <button
              key='webserverbutton'
              onClick={() => setProjectType('web-server')}
              className='projecttypebutton'
              disabled={projectType == 'web-server'}
            >
              Web Server
            </button>
          ]}
          name='Project Type'
        />

        <div className='absolute left-1/2 transform -translate-x-1/2 bottom-0 mb-5'>
          <p
            className='text-center mb-2'
            style={{
              display: creationMessage == '' ? 'none' : 'block',
              color:
                creationMessage == '' ? 'white' : creationMessage.split(':')[0]
            }}
          >
            {creationMessage == '' ? '' : creationMessage.split(':')[1]}
          </p>
          <button
            className='new-project-btn'
            onClick={async () =>
              await invoke('create_project', {
                projectType,
                projectFolder,
                projectName
              })
            }
            disabled={!creationButtonEnabled}
          >
            Create
          </button>
        </div>
      </div>
    </>
  )
}
