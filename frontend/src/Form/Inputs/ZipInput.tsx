import TextInput from "./TextInput";
import InputWrapper from './InputWrapper';

interface ZipInputProps {
  patientZipCode : string, 
  setPatientZipCode : (value: string) => void, 
  inputIsInvalid: boolean, 
  setInputIsInvalid: (value: boolean) => void,
  invalidInputMsg: string
}

export default function ZipInput(props : ZipInputProps) {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, '');
    props.setPatientZipCode(value);
    props.setInputIsInvalid(false);
  };

  return (
    <InputWrapper>
      <TextInput 
        label="Zip Code" 
        value={props.patientZipCode}
        onChange={handleOnChange}
        inputIsInvalid={props.inputIsInvalid}
        invalidInputMsg={props.invalidInputMsg}
      />
    </InputWrapper>
  )
}