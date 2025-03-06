import './App.css'
import Form from './Form/Form'
import Introduction from './Introduction/Introduction';
import { useState } from "react";

export default function App() {
  const [isIntro, setIsIntro] = useState(true);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center relative bottom-15">
          <img className="w-60 p-5" src="/CareMatesLogo.png"/>

          {isIntro && 
            <Introduction setIsIntro={setIsIntro} />
          }
          {!isIntro &&
            <Form />
          }

        </div>
      </div>
    </>
  )
}