import React from 'react';
import { Box } from '@mui/material';
import { useStateValue } from '../state';
import { HospitalProps } from '../types';

const HospitalCase = ({entry}: HospitalProps) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <Box border={1} borderRadius={1} sx={{ p: 1, my: 1 }}>
        <p>{entry.date}</p>
        <p>{entry.description}</p>
        <ul>
            {entry.diagnosisCodes?.map((code,index) => {
                const codeDiagnose = diagnoses.find(diagnose =>diagnose.code === code);
                return (<li key={index}>{code} {codeDiagnose?.name}</li>);
                }
            )}
        </ul>
        <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default HospitalCase;