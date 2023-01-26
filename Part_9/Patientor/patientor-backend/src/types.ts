// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface sickLeave {
  startDate: string;
  endDate: string;
}
interface discharge {
  date:string;
  criteria:string;
}
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = "other"
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

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientsEntry, 'id' | 'entries'>;

export type PublicPatient = Omit<PatientsEntry, 'ssn'>;

export type newEntry = Omit<Entry,'id'>;

export type Fields = { 
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown, 
};

export type newEntryFields = {  
  description:unknown,
  date:unknown,
  specialist:unknown,
  diagnosisCodes?:unknown[],
  type:unknown,
  employerName:unknown,
  sickLeave?:unknown,
  healthCheckRating:unknown,
  discharge:unknown
};
