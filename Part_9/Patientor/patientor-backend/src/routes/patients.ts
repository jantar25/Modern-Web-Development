import express from 'express';
import patientsServices from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patients!');
});

export default router;