import './OptionButtons.css'

type ButtonOption = {
  label: string
  onClick: () => void
}

type OptionButtonsProps = {
  buttons: ButtonOption[]
  name: string | null
}

export default function OptionButtons ({ buttons, name }: OptionButtonsProps) {
  return (
    <>
      <div className='container'>
        <h2 style={{ display: name == null ? 'none' : 'block' }}>{name}</h2>
        <div className='flex gap-2'>
          {buttons.map((btn, index) => (
            <button key={index} onClick={btn.onClick}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
