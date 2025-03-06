export default function NoMatchMessage() {
  return (
    <>
      <div className="p-5">
        <p>We are sorry to inform you that we did not find a facility with that <b className='text-indigo-500'>care type</b> near your <b className='text-indigo-500'>zip code</b>.</p>
        <br></br>
        <p>Please try again with another care type, another zip code or at a later time.</p>
      </div>
    </>
  )
}