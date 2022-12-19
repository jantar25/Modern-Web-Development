import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog,deleteBlog } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  //DELETE A BLOG
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  //UPDATE BLOG
  const handleUpdate = async () => {
    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }
    dispatch(likeBlog(blog.id,blogToUpdate))
  }

  return (
    <div className="blog">
      <span>
        {blog.title} {blog.author}
      </span>
      <button id={!visible ? 'view' : 'hide'} onClick={toggleVisibility}>
        {!visible ? 'view' : 'hide'}
      </button>
      {visible && (
        <div className="blogHidden">
          <div>{blog.url}</div>
          <div>
            <span id="blogLike">likes {blog.likes}</span>
            <button id="like" onClick={() => handleUpdate()}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user === blog.user.username && (
            <button
              id="delete"
              onClick={() => handleDelete()}
              className="blogDeleteBtn"
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
