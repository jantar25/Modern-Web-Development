import React,{ useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'

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
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blog Created</th>
          </tr>
          {users
            .map((user) => (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users