/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsServices from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name,dateOfBirth,ssn,gender,occupation } = req.body;
  const newPatientEntry = patientsServices.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
});
  res.json(newPatientEntry);
});

export default router;