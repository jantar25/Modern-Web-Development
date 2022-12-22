import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Blog from './Blog'

const BlogsList = () => {
  const { blogs,user } = useSelector(state => state)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className='container'>
      <h1 className='mb-4 mt-4'>blogs</h1>
      <Table striped>
        <tbody>
          {sortedBlogs
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`} className='link'>
                    <Blog
                      blog={blog}
                      user={user}
                    />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogsList