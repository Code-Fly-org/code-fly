'use client'

import { useEffect, useState } from 'react'
import './ProjectManager_layout.css'
import { app } from '@tauri-apps/api'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout ({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState<string | null>(null)
  const [rotation, setRotation] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      const tempVersion = await app.getVersion()
      setVersion(tempVersion)
    })()
  }, [])

  return (
    <>
      <div className='flex'>
        <div className='sidebar'>
          <Image
            src='/Icon.png'
            width={64}
            height={64}
            alt='CodeFly Logo'
            className='m-2 transition-transform duration-[1.5s]'
            draggable={false}
            style={{
              rotate: `${rotation}deg`
            }}
            onClick={() => {
              setRotation(rotation + 1800)
            }}
            onContextMenu={() => {
              setRotation(rotation - 1800)
            }}
          ></Image>
          <Link href='/projectmanager/projects'>Projects</Link>
          <Link href='/projectmanager/settings'>Settings</Link>
          {version != null && (
            <p className='mt-auto mr-auto ml-2 mb-2 text-gray-400'>
              PHP Fly v{version}
            </p>
          )}
        </div>
        <div className='relative z-0 flex-1'>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
