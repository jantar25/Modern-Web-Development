import HospitalCase from './HospitalCase';
import HealthcareCase from './HealthcareCase';
import HealthCheckCase from './HealthCheckCase';
import { entryProps } from '../types';

const Entries = ({entry}: entryProps) => {

    const switchEntries = () => {
      const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
      switch(entry.type) {
        case "Hospital":
          return <HospitalCase entry={entry} />;
        case "OccupationalHealthcare":
          return <HealthcareCase entry={entry} />;
        case "HealthCheck":
          return <HealthCheckCase entry={entry} />;
        default:
        return assertNever(entry); 
    }};


  return (
    <div >
    <div>
      {switchEntries()}
    </div>
  </div>
  );
};

export default Entries;