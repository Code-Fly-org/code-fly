'use client'

import './Editor_globals.css'

import FileList from './components/FileList'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import dynamic from 'next/dynamic'

function Editor_Layout_Sidebar () {
  const [projectFolder, setProjectFolder] = useState<string>(
    useSearchParams().get('folder') ?? ''
  )
  const [sideBarPage, setSideBarPage] = useState<string>('file-list')

  return (
    <div className='sidebar'>
      <div className='sidebar-tabs'>
        <button onClick={() => setSideBarPage('file-list')}>
          <FontAwesomeIcon icon={faFile} />
        </button>
      </div>

      <div className='separator'></div>

      <div className='sidebar-content'>
        {sideBarPage === 'file-list' && (
          <FileList projectFolder={projectFolder} />
        )}
      </div>
    </div>
  )
}

export default function Editor_Layout ({
  children
}: {
  children: React.ReactNode
}) {
  const Editor = dynamic(() => import('./components/components/Editor'), { ssr: false })

  return (
    <>
      <div className='flex'>
        <Suspense>
          <Editor_Layout_Sidebar />
        </Suspense>

        <div>
          <div className='top-buttons-div'>Buttons</div>

          <div className='code-editor-div'>
            <Editor />
          </div>

          <div className='bottom-bar-div'>Terminal</div>
        </div>
      </div>
      <main>{children}</main>
    </>
  )
}
