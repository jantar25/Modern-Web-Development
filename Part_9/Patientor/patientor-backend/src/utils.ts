import { NewPatientEntry,Gender,Fields } from "./types";

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


const parseTextString = (textString: unknown): string => {
    if (!textString || !isString(textString)) {
      throw new Error('Incorrect or missing comment');
    }
    return textString;
  };

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
  };

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing weather: ' + gender);
    }
    return gender;
  };

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}:Fields ): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseTextString(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        ssn: parseTextString(ssn),
        occupation: parseTextString(occupation),
      };
    
      return newEntry;
};

export default toNewPatientEntry;