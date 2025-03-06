import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

const steps = [
  '',
  '',
  '',
];

export default function FormStepper(props: { formStep : number}) {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper 
            activeStep={props.formStep} 
            alternativeLabel
            sx={{
              '& .MuiStepIcon-root.Mui-active': {
                color: "rgb(129, 140, 248)",
              },
              '& .MuiStepIcon-root.Mui-completed': {
                color: 'rgb(86, 82, 255)'
              }
            }}
          >
            {steps.map((_, index) => (
              <Step key={index}>
                <StepLabel StepIconProps={{
                  icon: index < 0 ? <CheckIcon /> : ''
                }} />
              </Step>
            ))}
          </Stepper>
        </Box>
    </>
  )
}