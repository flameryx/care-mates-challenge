import TextInput from './TextInput';
import InputWrapper from './InputWrapper';

interface NameInputProps {
  patientName: string, 
  setPatientName: (value: string) => void, 
  inputIsInvalid: boolean, 
  setInputIsInvalid: (value: boolean) => void,
  invalidInputMsg: string
}

export default function NameInput(props: NameInputProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setInputIsInvalid(false);
    props.setPatientName(e.target.value);
  };

  return (
    <InputWrapper>
      <TextInput 
        label="Name" 
        value={props.patientName}
        onChange={handleOnChange}
        inputIsInvalid={props.inputIsInvalid}
        invalidInputMsg={props.invalidInputMsg}
      />
    </InputWrapper>
  )
}