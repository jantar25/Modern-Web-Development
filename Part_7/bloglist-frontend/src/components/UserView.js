import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const { users } = useSelector(state => state)
  const userToView = users.filter(user => user.id === id)
  console.log(userToView)
  return (
    <div>
      <h1>{userToView[0].name}</h1>
      <h3>added blogs</h3>
      <ul>{userToView[0].blogs.map((blog) =>
        <li key={blog.id}>{blog.title}</li>
      )}
      </ul>
    </div>
  )
}

export default UserView