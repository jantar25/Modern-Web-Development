const Blogs = require('../models/blogs')

const initialBlogs = [
  {
    title: 'Harmful Statement ',
    author: 'Donna T. Dekojack',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
    likes: 15,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

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

const blogInDb = async () => {
  const blogs = await Blogs.find({})
  return blogs.map(blog => blog.toJSON())
}

const missingLike = (blog) => {
  return blog.likes? blog : 0
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  blogInDb,
  initialBlogs,
  missingLike,
  getTokenFrom
}