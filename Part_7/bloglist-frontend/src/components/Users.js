import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Users = () => {
  const { user,blogs } = useSelector(state => state)
  const userblogs = blogs.map((blog) => blog.user && { ...blog, user:blog.user.name,userId:blog.user.id })
  const groupBy = (blogs,key) => blogs.reduce(
    (result, blog) => ({
      ...result,
      [blog[key]]: [
        ...(result[blog[key]] || []),
        blog,
      ],
    }),
    {},
  )

  const blogsByUser = Object.entries(groupBy(userblogs,'userId'))
  if (!user) {
    return null
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>Blog Created</th>
        </tr>
        {blogsByUser
          .map((blog,index) => (
            <tr key={index}>
              <td><Link to={`/users/${blog[0]}`}>{blog[1][0].user}</Link></td>
              <td>{blog[1].length}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Users