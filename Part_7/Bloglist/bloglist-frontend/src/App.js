import React,{ useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { initializeBlog } from './reducers/blogReducer'
import { getAllUsers } from './reducers/usersReducer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Home from './Pages/Home'
import LoginForm from './components/LoginForm'
import UserView from './components/UserView'
import Users from './components/Users'
import BlogsView from './components/BlogsView'

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(getAllUsers())
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
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Router>
        <Menu />
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogsView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
