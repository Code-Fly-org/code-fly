'use client'

import './Editor_globals.css'

import Image from "next/image";
// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react'

import file_list_icon from "./assets/file_list_icon.svg";

export default function Editor_Layout ({
  children
}: {
  children: React.ReactNode
}) {
  // const [projectType, setProjectType] = useState<string>(useSearchParams().get("folder") ?? "")

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
