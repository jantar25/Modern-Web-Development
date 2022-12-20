import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const { blogs } = useSelector(state => state)
  const userblogs = blogs.map((blog) => blog.user && { ...blog, user:blog.user.name,userId:blog.user.id })
  const blogToView = userblogs.filter(blog => blog.userId === id)

  return (
    <div>
      <h1>{blogToView[0].user}</h1>
      <h3>added blogs</h3>
      <ul>{blogToView.map((blog) =>
        <li key={blog.id}>{blog.title}</li>
      )}
      </ul>
    </div>
  )
}

export default UserView