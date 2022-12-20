import React, { useState,useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

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
      <form onSubmit={handleCreate}>
        <div>
          <label>tittle</label>
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>author</label>
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>url</label>
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button id="create" type="submit">
          Create
        </button>
      </form>
    </Togglable>

  )
}

export default BlogCraeteForm
