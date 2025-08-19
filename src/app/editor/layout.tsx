'use client'

import './Editor_globals.css'

import Image from "next/image";

import file_list_icon from "./assets/file_list_icon.svg";

export default function Editor_Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='sidebar'>
        <button>
          <Image src={file_list_icon} alt="File list icon" width={60} height={60} />
        </button>
      </div>

      <main>{children}</main>
    </>
  )
}
