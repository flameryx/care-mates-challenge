import './App.css'
import Form from './Form/Form'

export default function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center relative bottom-15">
          <img className="w-60 p-5" src="/CareMatesLogo.png"/>
          <Form></Form>
        </div>
      </div>
    </>
  )
}