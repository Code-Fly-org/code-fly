'use client'

import React, { useEffect } from 'react'
import './Globals.css'
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ['400'],
  subsets: ['latin']
})

export default function Layout ({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handler = (e: MouseEvent) => e.preventDefault()
    document.addEventListener('contextmenu', handler)
    return () => document.removeEventListener('contextmenu', handler)
  }, [])

  return (
    <>
      <html lang='en' className={ubuntu.className}>
        <body>{children}</body>
      </html>
    </>
  )
}
