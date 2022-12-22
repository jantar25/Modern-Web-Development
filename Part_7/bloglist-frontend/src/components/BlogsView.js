import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog,deleteBlog } from '../reducers/blogReducer'
import BlogComments from './BlogComments'
import { Button } from 'react-bootstrap'

const BlogsView = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const { blogs,user } = useSelector(state => state)
  const blogToView = blogs.find(blog => blog.id === id)

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blogToView.title} by ${blogToView.author}?`)) {
      dispatch(deleteBlog(blogToView.id))
    }
  }

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
    <div className='container'>
      <h1>{blogToView.title} by {blogToView.author}</h1>
      <a href='#'>{blogToView.url}</a>
      <div className='my-2'>
        <span id="blogLike" className='mx-2'>likes {blogToView.likes}</span>
        <Button id="like" onClick={() => handleUpdate()}>
            like
        </Button>
      </div>
      <div className='my-2'>Added by {blogToView.user.name}</div>
      {user.username === blogToView.user.username && (
        <Button
          variant="danger"
          id="delete"
          onClick={() => handleDelete()}
        >remove</Button>
      )}
      <BlogComments blog={blogToView} />
    </div>
  )
}

export default BlogsView