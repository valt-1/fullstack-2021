const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')

describe('when there are some blogs initially saved in DB', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('GET /api/blogs', () => {

    test('responds with json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('responds with correct number of blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('id property of blog is formatted correctly', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })

  })

  describe('GET /api/blogs/:id', () => {

    test('viewing a blog succeeds when id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const response = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toEqual(blogToView)
    })

    test('responds with 404 if blog with given id does not exist', async () => {
      const id = await helper.nonExistingId()
      await api
        .get(`/api/blogs/${id}`)
        .expect(404)
    })

    test('responds with 400 if id is invalid', async () => {
      const id = 'asdf'
      await api
        .get(`/api/blogs/${id}`)
        .expect(400)
    })

  })

  describe('POST /api/blogs', () => {

    test('adds valid blog with correct properties', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain('Canonical string reduction')
    })

    test('sets likes to 0 if likes property is not specified', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)

      expect(response.body.likes).toBe(0)
    })

    test('does not add blog with no title, responds with 400', async () => {
      const newBlog = {
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('does not add blog with no url, responds with 400', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

  })

})

afterAll(() => {
  mongoose.connection.close()
})
