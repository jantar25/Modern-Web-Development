import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Users = () => {
  const { users } = useSelector(state => state)

  if (!users) {
    return null
  }

  return (
    <div className='container'>
      <h1>Users</h1>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blog Created</th>
          </tr>
          {users
            .map((user) => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`} className='link'>
                  {user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users