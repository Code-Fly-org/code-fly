import './OptionButtons.css'

type ButtonOption = {
  label: string;
  onClick: () => void;
};

type OptionButtonsProps = {
  buttons: ButtonOption[];
};

export default function OptionButtons({ buttons }: OptionButtonsProps) {
  return (
    <>
      {buttons.map((btn, index) => (
        <button key={index} onClick={btn.onClick}>
          {btn.label}
        </button>
      ))}
    </>
  );
}
