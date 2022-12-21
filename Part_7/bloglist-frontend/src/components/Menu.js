import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate ()
  const { user } = useSelector(state => state)

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    dispatch(logoutUser())
    navigate('/')
  }
  if (!user) {
    return null
  }

  return (
    <div className='menu'>
      <Link className='padding' to="/">blogs</Link>
      <Link className='padding' to="/users">users</Link>
      <span className='padding'>{user.name} logged In</span>
      <button className='padding' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu