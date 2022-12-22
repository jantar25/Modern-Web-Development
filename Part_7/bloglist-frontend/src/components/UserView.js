import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const { users } = useSelector(state => state)
  const userToView = users.filter(user => user.id === id)

  return (
    <div className='container'>
      <h1>{userToView[0].name}</h1>
      <h3 className='my-4'>added blogs</h3>
      <ol>{userToView[0].blogs.map((blog) =>
        <li key={blog.id}>{blog.title}</li>
      )}
      </ol>
    </div>
  )
}

export default UserView