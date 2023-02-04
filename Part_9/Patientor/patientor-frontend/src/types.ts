export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface sickLeave {
  startDate: string;
  endDate: string;
}
export interface discharge {
  date:string;
  criteria:string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string
  }


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosesEntry['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

export interface HospitalEntry  extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface entryProps {
  entry:Entry;
}

export interface HealthCheckProps {
  entry:HealthCheckEntry;
}

export interface HospitalProps {
  entry:HospitalEntry;
}

export interface HealthcareProps {
  entry:OccupationalHealthcareEntry;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}
