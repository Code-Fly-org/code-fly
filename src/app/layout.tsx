'use client'

import React from 'react'
import './Globals.css'
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ['400'],
  subsets: ['latin']
})

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang='en' className={ubuntu.className}>
        <body>{children}</body>
      </html>
    </>
  )
}

export default Layout
