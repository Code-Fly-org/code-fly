import { useState } from 'react'
import OptionButtons from '../components/OptionButtons'
import './Home.css'

export default function Home () {
  const [projectType, setProjectType] = useState<string>('website')
  const [projectPath, setProjectPath] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');

  return (
    <>
        <div className='justify-center mx-auto w-fit'>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
          />

          <input
            type="text"
            value={projectPath}
            onChange={(e) => setProjectPath(e.target.value)}
            placeholder="Project Path"
          />

          <OptionButtons
            buttons={[
              { label: 'Website', onClick: () => setProjectType('website') },
              { label: 'Web Server', onClick: () => setProjectType('webserver') }
            ]}
            name="Project Type"
          />

          <div className='absolute left-1/2 transform -translate-x-1/2 bottom-0 mb-5'>
            <button className='new-project-btn'>Create</button>
          </div>
        </div>
    </>
  )
}
