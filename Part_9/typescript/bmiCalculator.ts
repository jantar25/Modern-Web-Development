
const calculateBmi = (height : number,weight : number): number => {
const result = weight/((height*height))
// if (result < 18.5) {
//     return 'underweight (small weight)';
//   } else if (18.5 <= result && result <24.9) {
//     return 'Normal (healthy weight)';
//   } else if (25 <= result && result < 29.9) {
//     return 'overweight (big weight)';
//   }
// return 'obese'
return result
}

console.log(calculateBmi(180, 74))