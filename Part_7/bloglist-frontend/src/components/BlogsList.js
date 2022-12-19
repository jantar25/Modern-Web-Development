import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogsList = ({ user,handleUpdate,handleDelete }) => {
  const { blogs } = useSelector(state => state)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            user={user.username}
          />
        ))}
    </div>
  )
}

export default BlogsList