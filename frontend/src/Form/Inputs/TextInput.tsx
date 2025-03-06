import { TextField } from "@mui/material";

interface TextInputProps {
  label: string,
  value: string,
  inputIsInvalid: boolean, 
  invalidInputMsg: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function TextInput(props: TextInputProps) {
  return (
    <>
      <TextField 
        label={props.label}
        variant="outlined"  
        value={props.value}
        onChange={props.onChange}
        defaultValue=""
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "rgb(99, 102, 241)", // Border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(99, 102, 241)", // Border color when focused
            },
            "& fieldset": {
              borderColor: props.inputIsInvalid ? "rgb(239, 68, 68)" : "rgb(209 213 219)",
            }
          },
        }} />

        {props.inputIsInvalid && 
          <small className="text-red-400">{props.invalidInputMsg}</small>
        }
    </>
  )
}