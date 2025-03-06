import Button from "../../Shared/Button";

interface FormButtonsProps {
  formStep: number,
  noMatchFound: boolean,
  setFormStep: (value: number | ((prevStep: number) => number)) => void,
  setNoMatchFound: (value: boolean) => void,
  setInputIsInvalid: (value: boolean) => void,
  handleNameValidation: () => void,
  handleCareTypeValidation: () => void,
  handleSearchMatchingFacility: () => void,
}

export default function FormButtons(props : FormButtonsProps) {
  
  function onClickNextButton() {
    switch (props.formStep) {
      case 0: {
        return props.handleNameValidation();
      }
      case 1: {
        return props.handleCareTypeValidation();
      }
      case 2: {
        return props.handleSearchMatchingFacility();
      }
    }
  }

  function onClickBackButton() {
    if (props.noMatchFound) {
      props.setNoMatchFound(false)
    }
    else {
      props.setFormStep(formStep => formStep - 1)
      props.setInputIsInvalid(false);
    }
  }

  function onClickRestartButton() {
    props.setFormStep(0)
  }

  return (
    <>        
        {(props.noMatchFound || (props.formStep > 0 && props.formStep < 3))  && 
          <div className="float-left">
            <Button label="Back" primary={false} onClick={onClickBackButton} />
          </div>
        }
        
        {!props.noMatchFound && props.formStep < 3  && 
          <div className="float-right">
            <Button label="Next" primary={true} onClick={onClickNextButton} />
          </div>
        }

        {props.formStep >= 3 &&
          <Button label="Restart" primary={true} onClick={onClickRestartButton} />
        } 
    </>
  )
}