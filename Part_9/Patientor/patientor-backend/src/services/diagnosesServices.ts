import diagnosesData from '../data/diagnoses';
import { DiagnosesEntry } from '../types';


const getEntries = ():Array<DiagnosesEntry> => {
  return diagnosesData;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};