export default function BackButton(props: { onClick: () => void}) {
  return (
    <>
      <div id="back-button">
        <button type="button" onClick={props.onClick} className="bg-gray-300 float-left hover:bg-gray-200">
          Back
        </button>
      </div>
    </>
  )
}