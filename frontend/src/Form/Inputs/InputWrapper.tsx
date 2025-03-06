import { PropsWithChildren } from 'react';

export default function InputWrapper(props: PropsWithChildren) {

  return (
    <>
      <div className="mx-auto w-full h-20 px-10">
        {props.children}
      </div>
    </>
  )
}