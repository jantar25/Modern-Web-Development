import express from 'express';
import patientsServices from '../services/patientsServices';
import {toNewPatientEntry,toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.get('/:id',(req,res) => {
const id = req.params.id;
try {
  const Patient = patientsServices.getPatient(id);
  res.json(Patient);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
} 
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsServices.addPatient(newPatientEntry);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }  
});

router.post('/:id/entries',(req,res) => {
  const patientId = req.params.id;
  try { 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entry = toNewEntry(req.body);
    const newEntry = patientsServices.addEntry(entry,patientId);
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  } 
});

export default router;