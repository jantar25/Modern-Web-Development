import { State } from "./state";
import { Patient,Diagnosis,Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
    |{
      type: "ADD_ENTRY";
      payload:Entry
    }
    |{
      type: "SET_PATIENT";
      payload: Patient;
    }
    |{
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_PATIENT":
        return {
          ...state,
          patient: {
            [action.payload.id]: action.payload
          }
        };
      case "SET_DIAGNOSES":
        return {
          ...state,
          diagnoses: action.payload
        };
      case "ADD_ENTRY":
        const patientInfo:Patient = Object.values(state.patient)[0];
        const patientEntry:Entry[] = Object.values(state.patient)[0].entries;
        return {
          ...state,
          patient: {
            [patientInfo.id]:{
              ...patientInfo,
              entries: patientEntry.concat(action.payload)
            }
          }
          };
    default:
      return state;
  }
};

export const setPatientList  = (patientListFromApi:Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient  = (newPatient:Patient) : Action => {
  return {
   type: "ADD_PATIENT", 
   payload: newPatient 
  };
};

export const addEntry  = (newEntry:Entry) : Action => {
  return {
   type: "ADD_ENTRY", 
   payload: newEntry 
  };
};

export const setPatient  = (patient:Patient) : Action => {
  return { 
    type: "SET_PATIENT",
    payload: patient
   };
};

export const setDiagnoses  = (diagnoses:Diagnosis[]) : Action => {
  return { 
    type: "SET_DIAGNOSES",
    payload: diagnoses
   };
};