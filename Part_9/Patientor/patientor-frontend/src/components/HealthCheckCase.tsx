import React from 'react';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Box } from '@mui/material';
import { HealthCheckProps } from '../types';

const HealthCheckCase = ({entry}:HealthCheckProps) => {
  return (
    <Box border={1} borderRadius={1} sx={{ p: 1, my: 1 }}>
        <p>{entry.date} <MedicalServicesIcon /></p>
        <p>{entry.description}</p>
        <div><FavoriteOutlinedIcon color={
            entry.healthCheckRating === 0? 'success' :
            entry.healthCheckRating === 1? 'secondary':
            entry.healthCheckRating === 2? 'warning' : 'error'} />
        </div>
        <p>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default HealthCheckCase;