'use client'

import Image from 'next/image'
import './Sidebar.css'
import { useEffect, useState } from 'react'
import { app } from '@tauri-apps/api'
import Link from 'next/link'
import Icon from '../../assets/Icon.png'

export default function Sidebar () {
  const [version, setVersion] = useState<string | null>(null)
  const [rotation, setRotation] = useState<number>(0)

  useEffect(() => {
    ;(async () => {
      const tempVersion = await app.getVersion()
      setVersion(tempVersion)
    })()
  }, [])

  return (
    <div className='sidebar'>
      <Image
        src={Icon}
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
      <Link href='/projectmanager/packages'>Language Packages</Link>
      {version != null && (
        <p className='mt-auto mr-auto ml-2 mb-2 text-gray-400'>
          Code Fly v{version}
        </p>
      )}
    </div>
  )
}
