import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { initializeUser,logoutUser } from './reducers/userReducer'
import Notification from './components/Notification'
import BlogCraeteForm from './components/BlogCraeteForm'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged In
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <BlogCraeteForm />
      <BlogsList user={user} />
    </div>
  )
}

export default App
