interface ReturnedValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

interface CalculateValues {
    value1: number[];
    value2: number;
}

const parseArguments = (args: Array<string>): CalculateValues => {
    if (args.length <= 3) throw new Error('Not enough arguments');
    const array = args;
    const removeFirstThree  = array.splice(0,3);
    const exerciseTarget = Number(removeFirstThree[2]);
    const exerciseHour = array.map(Number);
  
    if (!exerciseHour.some(isNaN) && !isNaN(exerciseTarget)) {
      return {
        value1: exerciseHour,
        value2: exerciseTarget
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

export const calculateExercises = (exerciseHour:number[],exerciseTarget:number):ReturnedValues => {
    const trainingDays = exerciseHour.filter(n => n !== 0);
    const sumArray = exerciseHour.reduce((acc, value) => acc + value, 0);
    const average = sumArray/exerciseHour.length;
    const rate = Math.trunc((average*3)/exerciseTarget);
    const description = average > exerciseTarget? 
    'Well done,congratulation' : 'not too bad but could be better';
    return {
        periodLength: exerciseHour.length,
        trainingDays: trainingDays.length,
        success: average > exerciseTarget,
        rating: rate,
        ratingDescription: description,
        target: exerciseTarget,
        average: average
    };
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateExercises(value1,value2));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
