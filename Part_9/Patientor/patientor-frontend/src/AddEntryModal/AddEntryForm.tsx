import React from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { Entry } from '../types';
import { TextField,SelectField,typeOption } from './FormFields';
import { useStateValue } from '../state';
import { DiagnosisSelection } from '../AddPatientModal/FormField';


export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// const healthCheckRatingOptions: HealthCheckRatingOption[] = [
//     { value: HealthCheckRating.LowRisk, label: "LowRisk" },
//     { value: HealthCheckRating.Healthy, label: "Healthy" },
//     { value: HealthCheckRating.HighRisk, label: "HighRisk" },
//     { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" }
//   ];

const typeOptions: typeOption[] = [
    { value: 'HealthCheck', label: "HealthCheck" },
    { value: 'Hospital', label: "Hospital" },
    { value: 'OccupationalHealthcare', label: "OccupationalHealthcare" },
  ];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type:'HealthCheck',
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
    //   healthCheckRating: HealthCheckRating.Healthy,
    //   employerName: '',
    //   sickLeave: { 
    //     startDate: '',
    //     endDate: '',
    //     },
    //   discharge: {
    //     date:'',
    //     criteria:'',
    //   },
    }}
    onSubmit={onSubmit}
    validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
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
            {/* <Field
              label="DiagnosisCodes"
              placeholder="503,609,..."
              name="diagnosisCodes"
              component={TextField}
            /> */}
            {/* <SelectField label="HealthCheckRating" name="HealthCheckRating" options={healthCheckRatingOptions} /> */}
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