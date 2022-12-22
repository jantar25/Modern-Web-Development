const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const { initialBlogs,blogInDb,missingLike,mostBlogs,mostLikes,userInDb } = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blogs.deleteMany({})
  for (let blog of initialBlogs) {
    let blogObject = new Blogs(blog)
    await blogObject.save()
  }
},200000)


describe('when there is initially some blogs saved', () => {
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
})

describe('registor a new user', () => {
  test('registor one user', async () => {
    const newUser = {
      username: 'Jantar',
      name: 'Glody',
      password: '12345',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await userInDb()
    expect(userAtEnd).toHaveLength(1)

    const contents = userAtEnd.map(user => user.name)
    expect(contents).toContain(
      'Glody'
    )
  })
})

describe('addition of a new blog', () => {
  test('A valid content blog can not be added it token not provided', async () => {
    const newBlog = {
      title: 'Hashlem Whitchwes',
      author: 'Ed W. Doe',
      url: 'http://www.u.arizona.edu/~rubinson/hashlemWhitches',
      likes: 8,
    }

    const TOKEN = ''
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + TOKEN)
      .send(newBlog)
      .expect(401)


    const blogsAtEnd = await blogInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

  })

  test('A valid content blog can be added ', async () => {
    const newBlog = {
      title: 'Hashlem Whitchwes',
      author: 'Ed W. Doe',
      url: 'http://www.u.arizona.edu/~rubinson/hashlemWhitches',
      likes: 8,
    }
    const response = await api.post('/api/login').send({ username: 'Jantar', password: '12345' })
    const TOKEN = response._body.token
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + TOKEN)
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


  test('blog without content is not added', async () => {
    const blog = {
      url: 'http://www.u.arizona.edu/~rubinson/Pinchards',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    const blogsAtEnd = await blogInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})
describe('viewing a specific blog', () => {
  test('missing blog likes return 0 value', () => {
    const blog = {
      title: 'Pinchards',
      author: 'Ed W. Doe',
      url: 'http://www.u.arizona.edu/~rubinson/Pinchards',
    }
    expect(missingLike(blog)).toBe(0)
  })
})

describe('deletion of a blog', () => {
  test('blog deletion with valid id', async () => {
    const blogsAtStart = await blogInDb()
    const blogToDelete = blogsAtStart[0]
    const response = await api.post('/api/login').send({ username: 'Jantar', password: '12345' })
    const TOKEN = response._body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + TOKEN)
      .expect(204)

    const blogsAtEnd = await blogInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  })
})

describe('Updating a blog', () => {
  test('blog update with valid id', async () => {
    const blogsAtStart = await blogInDb()
    const blogToupdate = blogsAtStart[0]

    const blog = {
      likes: 39
    }

    await api
      .put(`/api/blogs/${blogToupdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await blogInDb()
    const contents = blogsAtEnd.map(b => b.likes)
    expect(contents).toContain(39)
  })
})

describe('viewing author with most blogs and likes', () => {
  test('viewing author with most blogs',async () => {
    const blogs = await blogInDb()
    expect(mostBlogs(blogs)).toEqual({
      author: 'Donna T. Dekojack',
      blogs: 2
    })
  })

  test('viewing author with most likes',async () => {
    const blogs = await blogInDb()
    expect(mostLikes(blogs)).toEqual({
      author: 'Donna T. Dekojack',
      likes: 20
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})