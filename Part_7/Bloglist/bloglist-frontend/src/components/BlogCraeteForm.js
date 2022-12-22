import React, { useState,useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'

const BlogCraeteForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h2>Create new</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>tittle</Form.Label>
          <Form.Control className="mb-1"
            id="title"
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control className="mb-1"
            id="author"
            type="text"
            value={author}
            name="author"
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control className="mb-1"
            id="url"
            type="text"
            value={url}
            name="url"
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Button className="mb-1" variant="success" id="create" type="submit">
          Create
        </Button>
      </Form>
    </Togglable>

  )
}

export default BlogCraeteForm
