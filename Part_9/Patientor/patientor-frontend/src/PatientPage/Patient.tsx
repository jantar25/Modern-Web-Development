import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useStateValue,setPatient } from '../state';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const fetchPatientInfo = async () => {
    try {
        const { data:patient } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if(Object.keys(patient)[0] !== id) {
      void fetchPatientInfo();
    }
    
const patientInfo = Object.values(patient)[0];
  return (
    <div>
      {patientInfo && (
      <>
        <h1>
        {patientInfo.name}
        {patientInfo.gender === "male"? 
        <MaleIcon /> : patientInfo.gender === "female"? 
        <FemaleIcon /> : <TransgenderIcon />}
        </h1>
        <div>ssn:{patientInfo.ssn}</div>
        <div>occupation:{patientInfo.occupation}</div>
      </>
    )}
    </div>
  );
};

export default PatientPage;