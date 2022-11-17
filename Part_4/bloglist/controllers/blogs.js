const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/user')
const { getTokenFrom } = require('../utils/list_helper')


//GET ALL BLOGS
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//ADD ONE BLOG
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET,{ expiresIn: 60*60 })
  if (!body.title || !body.author) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else {
    if ( !token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const user = await User.findById(decodedToken.id)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    }

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