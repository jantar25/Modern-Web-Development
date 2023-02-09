import React from 'react';
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField,SelectField,typeOption} from './FormFields';
import { EntryFormValues } from '../types';
import {SelectFieldHealthCheck,HealthCheckRatingOption } from './FormFields';
import { useStateValue } from '../state';
import { DiagnosisSelection } from './FormFields';


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
    { value: 0, label: "Healthy" },
    { value: 1, label: "Low risk" },
    { value: 2, label: "High risk" },
    { value: 3, label: "Critical risk" },
  ];

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
      type:'OccupationalHealthcare',
      description: '',
      date: '',
      specialist: '',
      employerName: '',
      sickLeave: { 
        startDate: '',
        endDate: '',
        },
      discharge: {
        date:'',
        criteria:'',
        },
        healthCheckRating: 0
      }
    }
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