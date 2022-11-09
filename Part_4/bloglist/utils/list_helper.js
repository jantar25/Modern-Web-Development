// const reverse = (string) => {
//   return string
//     .split('')
//     .reverse()
//     .join('')
// }

// const average = (array) => {
//   const reducer = (sum, item) => {
//     return sum + item
//   }
//   return array.length === 0
//     ? 0
//     : array.reduce(reducer, 0) / array.length
// }

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((accumulator,blog) => blog.likes + accumulator,0)
  return likes
}


module.exports = {
  dummy,
  totalLikes
}