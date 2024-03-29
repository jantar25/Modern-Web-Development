const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')



//GET ALL BLOGS
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

//ADD ONE BLOG
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const userId = request.user
  if (!body.title || !body.author) {
    return response.status(400).json({
      error: 'content missing'
    })
  } else {
    if (!userId) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      const user = await User.findById(userId)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
      let savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      savedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
      await user.save()
      response.status(201).json(savedBlog)
    }

  }
})

//DELETE ONE BLOG BY ID
blogsRouter.delete('/:id', async (request, response) => {
  const userId = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  if ( blogToDelete.user.toString() !== userId?.toString()) {
    response.status(401).json({ error: 'You are no allowed to do that' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

//UPDATE EXISTING BLOG
blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,
    { new: true, runValidators: true, context: 'query' })
  response.status(200).json(updatedBlog)
})


blogsRouter.put('/:id/comments', async (request, response) => {
  const body = request.body
  const value = body.comment
  if (!value) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const blogToComment = await Blog.findById(request.params.id)
  blogToComment.comments.push(value)
  const commentedtedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToComment,
    { new: true, runValidators: true, context: 'query' })
  response.status(200).json(commentedtedBlog)
})


module.exports = blogsRouter