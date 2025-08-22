'use client'

import './FileTreeRow.css'

import Image from "next/image";

import php_icon from "./icons/php.svg";

export default function FileTreeRow({ name }: { name: string }) {
  return (
    <div className="file-tree-row">
      {name.endsWith(".php") && <Image src={php_icon} alt="PHP Icon" width={50} height={50} />}
      <h1>{name}</h1>
    </div>
  )
}