import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogsList = () => {
  const { blogs,user } = useSelector(state => state)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogsList