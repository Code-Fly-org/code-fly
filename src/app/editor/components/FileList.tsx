'use client'

import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import './FileList.css'
import FileTreeRow from './components/FileTreeRow'

export default function FileList({ projectFolder }: { projectFolder: string }) {
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    if (projectFolder) {
      invoke<string[]>('read_dir', { path: projectFolder })
        .then(setFiles)
        .catch(err => console.error('Failed to read dir:', err))
    }
  }, [projectFolder])

  return (
    <div className="filelist">
      {files.map((file, i) => (
        <FileTreeRow key={i} name={file} />
      ))}
    </div>
  )
}
