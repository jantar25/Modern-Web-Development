import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const BlogsList = () => {
  const { blogs,user } = useSelector(state => state)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs
        .map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <Blog
              blog={blog}
              user={user}
            />
          </Link>
        ))}
    </div>
  )
}

export default BlogsList