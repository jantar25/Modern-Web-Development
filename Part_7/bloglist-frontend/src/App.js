import { useEffect } from 'react'
import { BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { initializeUser,logoutUser } from './reducers/userReducer'
import Notification from './components/Notification'
import BlogCraeteForm from './components/BlogCraeteForm'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import Users from './components/Users'

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
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/" element={
            <div>
              <div>
                <p>{user.name} logged In</p>
                <button onClick={handleLogout}>logout</button>
              </div>
              <div>
                <h2>Users</h2>
                <Users />
              </div>
              <BlogCraeteForm />
              <BlogsList user={user} />
            </div>
          } />
          <Route path="/user" element={<Users />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
