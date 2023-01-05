
const calculateBmi = (height : number,weight : number): string => {
const result = weight/((height*0.01)**2)
// switch(result) {
//     case (result < 18.5) {

//     }
// }
console.log(result)
if (result < 18.5) {
    return 'underweight (small weight)';
  } else if ( 18.5 < result && result < 24.9) {
    return 'Normal (healthy weight)';
  } else if ( 25 <result && result < 29.9) {
    return 'overweight (big weight)';
  } else if ( result > 30) {
    return 'obese';
  } else {
    return 'Incorect input'
  }
}

console.log(calculateBmi(160, 34))