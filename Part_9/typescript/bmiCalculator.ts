const calculateBmi = (height : number,weight : number): string => {
const result = weight/((height*0.01)**2)
if (result < 18.5) {
    return 'underweight (small weight)';
  } else if ( 18.5 <= result && result < 25) {
    return 'Normal (healthy weight)';
  } else if ( 25 <= result && result < 30) {
    return 'overweight (big weight)';
  } else if ( result >= 30) {
    return 'obese';
  } else {
    return 'Incorect values'
  }
}

console.log(calculateBmi(160, 64))