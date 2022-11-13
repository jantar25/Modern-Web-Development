const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.author) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else {
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

module.exports = blogsRouter