import React,{ useState } from 'react'

const BlogCraeteForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    createBlog({title,author,url})

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
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>author</label>
        <input
          type="text"
          value={author}
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>url</label>
        <input
          type="text"
          value={url}
          name="url"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
  )
}

export default BlogCraeteForm