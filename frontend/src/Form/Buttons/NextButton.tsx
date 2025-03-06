export default function NextButton(props: { onClick : () => void}) {
  return (
    <>
      <div id="next-button">
        <button type="button" onClick={props.onClick} className="bg-indigo-500 text-white float-right hover:bg-indigo-400">
          Next
        </button>
      </div>
    </>
  )
}