const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const { initialBlogs,blogInDb,missingLike } = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blogs.deleteMany({})
  for (let blog of initialBlogs) {
    let blogObject = new Blogs(blog)
    await blogObject.save()
  }
},100000)



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('verifies unique identifier of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.id)
  expect(contents[0]).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Hashlem Whitchwes',
    author: 'Ed W. Doe',
    url: 'http://www.u.arizona.edu/~rubinson/hashlemWhitches',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.title)
  expect(contents).toContain(
    'Hashlem Whitchwes'
  )
})

test('missing blog likes return 0 value', () => {
  const blog = {
    title: 'Pinchards',
    author: 'Ed W. Doe',
    url: 'http://www.u.arizona.edu/~rubinson/Pinchards',
  }
  expect(missingLike(blog)).toBe(0)
})

test('blog without content is not added', async () => {
  const blog = {
    url: 'http://www.u.arizona.edu/~rubinson/Pinchards',
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  const notesAtEnd = await blogInDb()
  expect(notesAtEnd).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})