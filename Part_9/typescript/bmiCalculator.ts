export const calculateBmi = (height : number,weight : number): string => {
const result = weight/((height*0.01)**2);
if (result < 18.5) {
    return 'underweight';
  } else if ( 18.5 <= result && result < 25) {
    return 'Normal (healthy weight)';
  } else if ( 25 <= result && result < 30) {
    return 'overweight';
  } else if ( result >= 30) {
    return 'obese';
  } else {
    return 'Incorect values';
  }
};

// const height = Number(process.argv[2])
// const weight = Number(process.argv[3])
// console.log(calculateBmi(height,weight))
