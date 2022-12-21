import React,{ useEffect } from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { initializeBlog } from './reducers/blogReducer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Home from './Pages/Home'
import LoginForm from './components/LoginForm'
import UserView from './components/UserView'
import Users from './components/Users'
import BlogsView from './components/BlogsView'

const App = () => {
  const dispatch = useDispatch()

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

  const { user } = useSelector(state => state)

  return (
    <Router>
      <div>
        <Menu />
        <Notification />
        <Routes>
          <Route path="/" element={user? <Home /> : <Navigate replace to="/login" />} />
          <Route path="/blogs/:id" element={<BlogsView />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={!user? <LoginForm /> : <Navigate replace to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
