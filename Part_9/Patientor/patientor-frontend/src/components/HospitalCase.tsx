import React from 'react';
import { useStateValue } from '../state';
import { HospitalProps } from '../types';

const HospitalCase = ({entry}: HospitalProps) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <div>
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
    </div>
  );
};

export default HospitalCase;