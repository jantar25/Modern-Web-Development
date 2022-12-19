import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogsList = ({ user }) => {
  const { blogs } = useSelector(state => state)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user.username}
          />
        ))}
    </div>
  )
}

export default BlogsList