import React, { useState } from 'react'

const BlogCraeteForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
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
    </div>
  )
}

export default BlogCraeteForm
