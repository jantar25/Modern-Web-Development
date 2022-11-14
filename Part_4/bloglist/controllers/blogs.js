const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

//GET ALL BLOGS
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//ADD ONE BLOG
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

//DELETE ONE BLOG BY ID
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//UPDATE EXISTING BLOG
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,
    { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})


module.exports = blogsRouter