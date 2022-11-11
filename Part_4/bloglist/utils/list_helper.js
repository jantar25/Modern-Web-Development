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
  const likes = blogs.reduce((sum,blog) => blog.likes + sum,0)
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, blog) => (prev.likes > blog.likes) ? prev : blog)
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}