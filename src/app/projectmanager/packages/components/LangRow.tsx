'use client'

import './LangRow.css'

export default function LangRow ({ lang, title_color }: { lang: string, title_color: string }) {
  return (
    <>
      <div className='lang-row'>
        <h1 className='lang-title' style={{ color: title_color || "white" }}>{lang}</h1>
        <div className='buttons-container'>
          <button>Install</button>
        </div>
      </div>
    </>
  )
}
