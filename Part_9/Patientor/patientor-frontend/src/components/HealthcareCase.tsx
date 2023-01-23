import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import { HealthcareProps } from '../types';

const HealthcareCase = ({entry}:HealthcareProps) => {
  return (
    <div>
        <p>{entry.date} <WorkIcon /><span>{entry.employerName}</span></p>
        <p>{entry.description}</p>
        <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthcareCase;