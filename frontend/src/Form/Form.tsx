import { useState, useEffect } from "react"
import FormButtons from './Buttons/FormButtons'
import NameInput from './Inputs/NameInput'
import ZipInput from './Inputs/ZipInput'
import CareTypesInput from './Inputs/CareTypesInput'
import NoMatchMessage from './Messages/NoMatchMessage'
import FormStepper from './FormStepper'
import MatchMessage from "./Messages/MatchMessage"
import { formApi } from "../api/formApi"
import { careTypesApi } from "../api/careTypesApi"
import { SelectChangeEvent } from '@mui/material';


export class MatchedFacility {
  name: string;
  zipCode: string;

  constructor() {
    this.name = "";
    this.zipCode = "";
  }
}

export default function Form() {
  const [formStep, setFormStep] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [patientCareType, setPatientCareType] = useState("");
  const [patientZipCode, setPatientZipCode] = useState("");
  const [matchedFacility, setMatchedFacility] = useState<MatchedFacility>(new MatchedFacility)
  const [noMatchFound, setNoMatchFound] = useState(false);
  const [inputIsInvalid, setInputIsInvalid] = useState(false);
  const [invalidInputMsg, setInvalidInputMsg] = useState("");
  const [careTypes, setCareTypes] = useState<string[]>([]);

  const handleOnChangeCareTypes = (e: SelectChangeEvent) => {
    setPatientCareType(e.target.value);
    setInputIsInvalid(false);
  };

  useEffect(() => {
    async function fetchCareTypes() {
      try {
        const response = await careTypesApi.getAllCareTypes();

        if (response) {
          const json = await response.json();

          if (response.status === 200) {
            
            setCareTypes(json.data.map((x: { name: string}) => x.name));
          }
          else {
            console.error("Failed to fetch care types");
          }
        }
      } catch (error) {
        console.error("Error fetching care types:", error);
      }
    }

    fetchCareTypes();
  }, []);

  
  async function handleNameValidation() {
    if (!patientName) {
      setInputIsInvalid(true);
      setInvalidInputMsg("You must enter your name.")
      return;
    }

    const response = await formApi.validateName(patientName);
    
    if (response) 
      await handleValidateNameResponse(response);
  }


  async function handleCareTypeValidation() {
    if (!patientCareType) {
      setInputIsInvalid(true);
      setInvalidInputMsg("You must select a care type.")
      return;
    }

    const response = await formApi.validateCareType(patientCareType);
    
    if (response) 
      await handleValidateCareTypeResponse(response);
  }


  async function handleSearchMatchingFacility() {
    if (!patientZipCode) {
      setInputIsInvalid(() => true);
      setInvalidInputMsg("You must enter your zip code.")
      return;
    }

    const response = await formApi.searchMatchingFacility(patientZipCode, patientCareType);

    if (response) 
      await handleSearchMatchingFacilityResponse(response);
  }
  
  async function handleValidateNameResponse(response: Response) {
    const json = await response.json();

    switch (response.status) {
      case 200:
        setFormStep(formStep => formStep + 1);
        break;
      case 400:
        setInputIsInvalid(() => true);
        setInvalidInputMsg(() => json.message)
        console.error(json.message);
        break;
      case 500:
        console.error(json.message);
        break;
    }
  }

  async function handleValidateCareTypeResponse(response: Response) {
    const json = await response.json();

    switch (response.status) {
      case 200:
        setFormStep((formStep) => formStep + 1);
        break;
      case 404:
        setNoMatchFound(() => true);
        console.error(json.message);
        break;
      case 500:
        console.error(json.message);
        break;
    }
  }

  async function handleSearchMatchingFacilityResponse(response: Response) {
    const json = await response.json();

    switch (response.status) {
      case 200:
        setMatchedFacility({ name: json.data.facilityName, zipCode: json.data.zipCode });
        setFormStep(formStep => formStep + 1);
        break;
      case 400:
        setInputIsInvalid(() => true);
        setInvalidInputMsg(() => json.message)
        console.log(json.message);
        break;
      case 404:
        setNoMatchFound(() => true)
        console.error(json.message);
        break;
      case 500:
        console.log(json.message);
        break;
    }   
  }


  return (
    <>
      <form className="bg-white w-100 h-80 rounded-3xl border-1 border-gray-200 shadow-lg">

        <div className="h-1/5 flex items-end">
          <FormStepper formStep={formStep}></FormStepper>
        </div>

        <div className="flex items-center h-3/5">

        { noMatchFound && <NoMatchMessage></NoMatchMessage> }
        {!noMatchFound && (
          <>
          {(() => {
                switch (formStep) {
                  case 0:
                    return <NameInput patientName={patientName} setPatientName={setPatientName} inputIsInvalid={inputIsInvalid} setInputIsInvalid={setInputIsInvalid} invalidInputMsg={invalidInputMsg} />;
                  case 1:
                    return <CareTypesInput patientCareType={patientCareType} setPatientCareType={setPatientCareType} careTypes={careTypes} handleOnChangeCareTypes={handleOnChangeCareTypes} inputIsInvalid={inputIsInvalid} setInputIsInvalid={setInputIsInvalid} invalidInputMsg={invalidInputMsg}/>;
                  case 2:
                    return <ZipInput patientZipCode={patientZipCode} setPatientZipCode={setPatientZipCode} inputIsInvalid={inputIsInvalid}  setInputIsInvalid={setInputIsInvalid} invalidInputMsg={invalidInputMsg} />;
                  case 3:
                    return <MatchMessage matchedFacility={matchedFacility} />;
                }
          })()}
          </>
        )}

        </div>

        <div className="h-1/5 px-5">
          <FormButtons 
            formStep={formStep} 
            setFormStep={setFormStep}
            noMatchFound={noMatchFound}
            setNoMatchFound={setNoMatchFound}
            setInputIsInvalid={setInputIsInvalid}
            handleNameValidation={handleNameValidation} 
            handleCareTypeValidation={handleCareTypeValidation}
            handleSearchMatchingFacility={handleSearchMatchingFacility}
            ></FormButtons>
        </div>

      </form>
    </>
  )
}


