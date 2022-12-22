import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state)

  useEffect(() => {
    dispatch(getAllUsers())
  },[])

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