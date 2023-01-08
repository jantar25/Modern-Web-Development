import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!height && !weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else{
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBmi(height,weight)
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises,target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const exerciseHour:number[] = daily_exercises.map(Number);
  if(!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing'});
  } else if (exerciseHour.some(isNaN) || isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else{
    const result = calculateExercises(exerciseHour,Number(target));
    res.send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});