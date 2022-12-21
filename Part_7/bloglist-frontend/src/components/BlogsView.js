import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog,deleteBlog } from '../reducers/blogReducer'
import BlogComments from './BlogComments'

const BlogsView = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const { blogs,user } = useSelector(state => state)
  const blogToView = blogs.find(blog => blog.id === id)
  console.log(blogToView)
  //DELETE A BLOG
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blogToView.title} by ${blogToView.author}?`)) {
      dispatch(deleteBlog(blogToView.id))
    }
  }

  //UPDATE BLOG
  const handleUpdate = async () => {
    const blogToUpdate = {
      user: blogToView.user.id,
      likes: blogToView.likes + 1,
      title: blogToView.title,
      author: blogToView.author,
      url: blogToView.url,
    }
    dispatch(likeBlog(blogToView.id,blogToUpdate))
  }
  return (
    <div>
      <h1>{blogToView.title} by {blogToView.author}</h1>
      <a href='#'>{blogToView.url}</a>
      <div>
        <span id="blogLike">likes {blogToView.likes}</span>
        <button id="like" onClick={() => handleUpdate()}>
            like
        </button>
      </div>
      <div>Added by {blogToView.user.name}</div>
      {user.username === blogToView.user.username && (
        <button
          id="delete"
          onClick={() => handleDelete()}
          className="blogDeleteBtn"
        >
              remove
        </button>
      )}
      <BlogComments blog={blogToView} />
    </div>
  )
}

export default BlogsView