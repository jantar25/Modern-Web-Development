import patientsEntries from "../data/patients";
import { NonSensitivePatientsEntry,PatientsEntry } from "../types";

const getEntries = (): PatientsEntry[] => {
    return patientsEntries;
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

  const addPatient = () => {
    return null;
  };
  
  export default {
    getNonSensitiveEntries,
    getEntries,
    addPatient
  };