import Button from "../Shared/Button";


interface IntroMessageProps {
  setIsIntro: (x: boolean) => void;
}

export default function IntroMessage(props : IntroMessageProps) {

  const onClickStart = () => {
    props.setIsIntro(false);
  }

  return (
    <>
    <div className="bg-white w-180 h-95 rounded-3xl border-1 border-gray-200 shadow-lg p-5">
      <p>
        Welcome to <b className="text-indigo-500">CareMates</b>!
      </p>
      <br/>
      <p>User research has shown that patients and their relatives struggle to find suitable care facilities. Often, they discover a facility online only to realize it has no available capacity or does not serve their area.</p>
      <br/>
      <p>In order to address this issue, we at <b className="text-indigo-500">CareMates</b> are developing a smart portal that matches patients with the right care facility based on their <b>name, address, and type of care needed.</b></p>
      <br/>
      <p>We call it the <b className="text-indigo-500">CarePortal</b>.</p>
      <p>Check it out!</p>
      <br/>
      <Button label="Start" primary={true} onClick={onClickStart} />
    </div>
    </>
  )
}