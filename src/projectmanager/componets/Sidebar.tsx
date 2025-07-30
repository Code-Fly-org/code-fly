import './Sidebar.css'
import Icon from '../../Icon.png'
import { app } from '@tauri-apps/api'
import { useEffect, useState } from 'react'

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
    <>
      <div className='sidebar'>
        <img
          src={Icon}
          width={64}
          height={64}
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
        ></img>
        <button onClick={() => (window.location.hash = 'projects')}>
          Projects
        </button>
        <button onClick={() => (window.location.hash = 'settings')}>
          Settings
        </button>
        {version != null && (
          <p className='mt-auto mr-auto ml-2 mb-2 text-gray-400'>
            PHP Fly v{version}
          </p>
        )}
      </div>
    </>
  )
}
