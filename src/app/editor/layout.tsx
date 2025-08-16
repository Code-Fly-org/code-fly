'use client'

import "./Editor_Globals.css";

export default function Editor_Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="sidebar"></div>

      <main>{children}</main>
    </>
  )
}