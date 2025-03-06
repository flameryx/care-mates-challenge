interface ButtonProps {
  onClick: () => void,
  label: string,
  primary: boolean
}

export default function Button(props: ButtonProps) {

  let buttonStyle;

  if (props.primary) {
    buttonStyle = "bg-indigo-500 text-white hover:bg-indigo-400"
  } 
  else {
    buttonStyle = "bg-gray-300 float-left hover:bg-gray-200"
  }

  return (
    <>
      <div>
        <button type="button" onClick={props.onClick} className={buttonStyle}>
          {props.label}
        </button>
      </div>
    </>
  )
}