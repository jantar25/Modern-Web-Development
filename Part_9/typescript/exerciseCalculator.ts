interface ReturnedValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }

const calculateExercises = (exerciseHour:number[],exerciseTarget:number):ReturnedValues => {
    const trainingDays = exerciseHour.filter(n => n !== 0)
    const sumArray = exerciseHour.reduce((acc, value) => acc + value, 0)
    const average = sumArray/exerciseHour.length
    const rate = Math.trunc((average*3)/exerciseTarget)
    const description = average > exerciseTarget? 
    'Well done,congratulation' : 'not too bad but could be better'
    return {
        periodLength: exerciseHour.length,
        trainingDays: trainingDays.length,
        success: average > exerciseTarget,
        rating: rate,
        ratingDescription: description,
        target: exerciseTarget,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))