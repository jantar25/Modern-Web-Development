const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')

const api = supertest(app)

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

beforeEach(async () => {
  await Blogs.deleteMany({})
  let blogObject = new Blogs(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blogs(initialBlogs[1])
  await blogObject.save()
},100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})