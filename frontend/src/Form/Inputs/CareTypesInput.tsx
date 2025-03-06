import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import InputWrapper from './InputWrapper';

interface CareTypesInputProps {
  patientCareType: string,
  setPatientCareType: (value: string) => void,
  inputIsInvalid: boolean,
  setInputIsInvalid: (value: boolean) => void,
  invalidInputMsg: string,
  careTypes: string[],
  handleOnChangeCareTypes: (e: SelectChangeEvent) => void
}

export default function CareTypesInput(props : CareTypesInputProps) {


  return (
    <InputWrapper>
      <FormControl fullWidth>
        <InputLabel>Care Type</InputLabel>
        <Select
          id="patient-care-type"
          label="Care Type"
          value={props.patientCareType}
          onChange={props.handleOnChangeCareTypes}
          defaultValue=""
          sx={{
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(129, 140, 248)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(99, 102, 241)',
            },
            "& fieldset": {
            borderColor: props.inputIsInvalid ? "rgb(239, 68, 68)" : "rgb(209 213 219)",
          }
          }}
        >

        {props.careTypes.map(careType => (
          <MenuItem key={careType} value={careType}>{careType}</MenuItem>
        ))}
        
        </Select>

        {props.inputIsInvalid && 
          <small className="text-red-400">{props.invalidInputMsg}</small>
        }
      </FormControl>
    </InputWrapper>
  )
}