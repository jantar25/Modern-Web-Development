import { v1 as uuid } from 'uuid';
import patientsEntries from "../data/patients";
import { NonSensitivePatientsEntry,NewPatientEntry,PatientsEntry } from "../types";

const getEntries = (): PatientsEntry[] => {
    return patientsEntries;
  };
  
const getPatient = (id:string): PatientsEntry | string => {
  const Patient = patientsEntries.find(patient => patient.id === id);
  if(!Patient) return "there is not patient correcponding to that ID";
  return Patient;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsEntries.map(({id,name,dateOfBirth,gender,occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
  }; 

  const addPatient = (entry:NewPatientEntry):PatientsEntry => {
    const newPatient = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      entries:[],
      ...entry
    };
    patientsEntries.push(newPatient);
  return newPatient;
};


  // const addEntry = (entry:newEntry,patientId:string):Entry => {
  //   const Patient = (getPatient(patientId));
  //   const existingEntries:Entry[] = Patient;
  //     const newEntryItem = {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  //       id: uuid(),
  //       ...entry
  //     };
  //     existingEntries.push(newEntryItem);
  //   return newEntry;
  // };

  
  export default {
    getNonSensitiveEntries,
    getEntries,
    getPatient,
    addPatient
  };