import { JSX } from 'react'
import './OptionButtons.css'

type OptionButtonsProps = {
  buttons: JSX.Element[]
  name: string | null
}

export default function OptionButtons ({ buttons, name }: OptionButtonsProps) {
  return (
    <>
      <div className='container'>
        <h2 style={{ display: name == null ? 'none' : 'block' }}>{name}</h2>
        <div className='flex gap-2'>{buttons}</div>
      </div>
    </>
  )
}
