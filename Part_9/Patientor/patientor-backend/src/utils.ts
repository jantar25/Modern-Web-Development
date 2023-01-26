import { NewPatientEntry,Gender,Fields,newEntryFields,HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseTextString = (textString: unknown): string => {
    if (!textString || !isString(textString)) {
      throw new Error('Incorrect or missing value');
    }
    return textString;
  };

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing birthdate: ' + dateOfBirth);
    }
    return dateOfBirth;
  };

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing HealthCheckRate: ' + healthCheckRating);
    }
    return healthCheckRating;
  };

const parseTextStringArray = (textString: unknown[] | undefined): string[] => {
  if (textString?.length===0 || textString?.map(text=> !isString(text))) {
    throw new Error('Incorrect or missing value ');
  }
  return textString as string[];
};

  export const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}:Fields ): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseTextString(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        ssn: parseTextString(ssn),
        occupation: parseTextString(occupation),
      };
    
      return newEntry;
};


export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  employerName,
  sickLeave,
  healthCheckRating,
  discharge }:newEntryFields) => {

  switch(type) {
    case "Hospital":
      return {
        description:parseTextString(description),
        type: type,
        date:parseTextString(date),
        specialist:parseTextString(specialist),
        diagnosisCodes:[parseTextString(diagnosisCodes)],
        discharge:discharge
      };
    case "OccupationalHealthcare":
      return {
        description:parseTextString(description),
        type: type,
        date:parseTextString(date),
        specialist:parseTextString(specialist),
        diagnosisCodes:[parseTextString(diagnosisCodes)],
        employerName: employerName,
        sickLeave: sickLeave
      };
    case "HealthCheck":
      return {
        description:parseTextString(description),
        type: type,
        date:parseTextString(date),
        specialist:parseTextString(specialist),
        diagnosisCodes:parseTextStringArray(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
    default:
    return 'Unhandled discriminated union member'; 
}

};
