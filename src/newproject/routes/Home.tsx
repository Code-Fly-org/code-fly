import { useEffect, useState } from 'react'
import OptionButtons from '../components/OptionButtons'
import './Home.css'
import { documentDir } from '@tauri-apps/api/path'
import { open } from '@tauri-apps/plugin-dialog'

export default function Home () {
  const [projectType, setProjectType] = useState<string>('website')
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
            { label: 'Website', onClick: () => setProjectType('website') },
            { label: 'Web Server', onClick: () => setProjectType('webserver') }
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
