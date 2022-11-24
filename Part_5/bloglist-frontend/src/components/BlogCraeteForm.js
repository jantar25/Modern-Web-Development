import React from 'react'

const BlogCraeteForm = ({
    handleCreate,
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange
}) => {
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
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>author</label>
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label>url</label>
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
  )
}

export default BlogCraeteForm