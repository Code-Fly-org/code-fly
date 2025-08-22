'use client'

import './Editor_globals.css'

import FileList from './components/FileList'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import file_list_icon from './assets/file_list_icon.svg'

function Editor_Layout_Sidebar () {
  const [projectFolder, setProjectFolder] = useState<string>(
    useSearchParams().get('folder') ?? ''
  )
  const [sideBarPage, setSideBarPage] = useState<string>('file-list')

  return (
    <div className='sidebar'>
      <div className='sidebar-tabs'>
        <button onClick={() => setSideBarPage('file-list')}>
          <Image
            src={file_list_icon}
            alt='File list icon'
            width={60}
            height={60}
          />
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
  return (
    <>
      <Suspense>
        <Editor_Layout_Sidebar />
      </Suspense>
      <main>{children}</main>
    </>
  )
}
