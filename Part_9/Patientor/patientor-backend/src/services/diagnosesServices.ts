import diagnosesData from '../data/diagnoses';
import { DiagnosesEntry } from '../types';


const getEntries = (): DiagnosesEntry[] => {
  return diagnosesData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};