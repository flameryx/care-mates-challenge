export default function RestartButton(props: { onClick: () => void }) {
  return (
    <>
      <div id="restart-button">
        <button type="button" onClick={props.onClick} className="bg-indigo-500 text-white hover:bg-indigo-600">
          Restart
        </button>
      </div>
    </>
  )
}