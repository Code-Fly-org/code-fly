import { useEffect, useState } from 'react'
import OptionButtons from '../components/OptionButtons'
import './Home.css'
import { documentDir } from '@tauri-apps/api/path'
import { open } from '@tauri-apps/plugin-dialog'

export default function Home () {
  const [projectType, setProjectType] = useState<string>('empty')
  const [projectFolder, setProjectFolder] = useState<string>('')
  const [projectName, setProjectName] = useState<string>('')

  useEffect(() => {
    ;(async () => {
      const projPath = await documentDir()
      setProjectFolder(projPath)
    })()
  }, [])

  return (
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
              onClick={() => setProjectType('empty')}
              className='projecttypebutton'
              disabled={projectType == 'empty'}
            >
              Empty
            </button>,
            <button
              onClick={() => setProjectType('website')}
              className='projecttypebutton'
              disabled={projectType == 'website'}
            >
              Website
            </button>,
            <button
              onClick={() => setProjectType('webserver')}
              className='projecttypebutton'
              disabled={projectType == 'webserver'}
            >
              Web Server
            </button>
          ]}
          name='Project Type'
        />
        <div className='absolute left-1/2 transform -translate-x-1/2 bottom-0 mb-5'>
          <button className='new-project-btn'>Create</button>
        </div>
      </div>
    </>
  )
}
