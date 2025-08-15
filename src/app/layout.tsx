'use client'

import React, { useEffect } from 'react'
import './Globals.css'
import { Lexend } from 'next/font/google'

const lexend = Lexend({
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
      <html lang='en' className={lexend.className}>
        <body>{children}</body>
      </html>
    </>
  )
}
