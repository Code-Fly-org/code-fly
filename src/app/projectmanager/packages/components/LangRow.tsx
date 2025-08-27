'use client'

import './LangRow.css'

export default function LangRow ({ lang }: { lang: string }) {
  return (
    <>
      <div className='lang-row'>
        <h1 className='lang-title'>{lang}</h1>
      </div>
    </>
  )
}
