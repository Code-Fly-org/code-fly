'use client'

import './Editor_globals.css'

export default function Editor_Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='sidebar'></div>

      <main>{children}</main>
    </>
  )
}
