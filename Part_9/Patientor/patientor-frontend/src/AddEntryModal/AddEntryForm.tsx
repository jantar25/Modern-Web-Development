import React from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { OccupationalHealthcareEntry,HealthCheckEntry,HospitalEntry } from '../types';
import { TextField,SelectField,typeOption} from './FormFields';
import {HealthCheckRating } from '../types';
import {SelectFieldHealthCheck,HealthCheckRatingOption } from './FormFields';
import { useStateValue } from '../state';
import { DiagnosisSelection } from './FormFields';


type healthCheckRatingType = Omit<OccupationalHealthcareEntry, "id">;
type HealthCheckEntryType = Omit<HealthCheckEntry, "id">;
type HospitalEntryType = Omit<HospitalEntry, "id">;
export type EntryFormValues = healthCheckRatingType | HealthCheckEntryType| HospitalEntryType;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
    { value: HealthCheckRating.LowRisk, label: "LowRisk" },
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.HighRisk, label: "HighRisk" },
    { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
  ];

const typeOptions: typeOption[] = [
    { value: 'HealthCheck', label: "HealthCheck" },
    { value: 'Hospital', label: "Hospital" },
    { value: 'OccupationalHealthcare', label: "OccupationalHealthcare" },
  ];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  
  const initialHealthcareData:EntryFormValues = {
    type:'OccupationalHealthcare',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    employerName: '',
    sickLeave: { 
      startDate: '',
      endDate: '',
      },
  };

  // const initialHospitalData:EntryFormValues = {
  //   type:'Hospital',
  //   description: '',
  //   date: '',
  //   specialist: '',
  //   diagnosisCodes: [],
  //   discharge: {
  //     date:'',
  //     criteria:'',
  //   },
  // };

  // const initialCheckRatingData:EntryFormValues = {
  //   type:'HealthCheck',
  //   description: '',
  //   date: '',
  //   specialist: '',
  //   diagnosisCodes: [],
  //   healthCheckRating: HealthCheckRating.Healthy,
  // };

  return (
    <Formik
    initialValues={initialHealthcareData}
    onSubmit={onSubmit}
    validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.diagnosisCodes?.length === 0) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched,values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions} />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 
            { values.type === 'OccupationalHealthcare' ?
            <>
            <Field
              label="Employer Name"
              placeholder="employerName"
              name="employerName"
              component={TextField}
            />
            <Field
              label="SickLeave Start"
              placeholder="YYYY-MM-DD"
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label="SickLeave End"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            </> : values.type === 'HealthCheck' ?
            <SelectFieldHealthCheck 
            label="HealthCheckRating"
            name="HealthCheckRating"
            options={healthCheckRatingOptions} />
            : <>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name='discharge.date'
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="criteria"
              name="discharge.criteria"
              component={TextField}
            />
            </>
            }

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
        );
      }}
  </Formik>
  );
};

export default AddEntryForm;