import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import { HealthcareProps } from '../types';
import { Box } from '@mui/material';

const HealthcareCase = ({entry}:HealthcareProps) => {
  return (
    <Box border={1} borderRadius={1} sx={{ p: 1, my: 1 }}>
        <p>{entry.date} <WorkIcon /><span>{entry.employerName}</span></p>
        <p>{entry.description}</p>
        <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default HealthcareCase;