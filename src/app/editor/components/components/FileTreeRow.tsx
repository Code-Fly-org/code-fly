import './FileTreeRow.css'

import Image from "next/image";

import php_icon from "./icons/php.svg";
import folder_icon from "./icons/folder.svg";
import txt_icon from "./icons/txt.svg";

export default function FileTreeRow({ name }: { name: string }) {
  let file_icon = null

  if (name.endsWith(".php")) {
    file_icon = php_icon
  } else if (name.endsWith(".txt")) {
    file_icon = txt_icon
  } else {
    file_icon = folder_icon
  }

  return (
    <div className="file-tree-row">
      {file_icon != null && <Image src={file_icon} alt="File Icon" width={50} height={50} />}
      <h1>{name}</h1>
    </div>
  )
}