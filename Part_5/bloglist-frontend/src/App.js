import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCraeteForm from './components/BlogCraeteForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)


  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    try {
      const blog = await blogService.create({
        title,author,url
      })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setSuccessMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification 
          message={errorMessage || successMessage} 
          style={errorMessage? "error" : "success"} 
        />
        <LoginForm 
            handleLogin = {handleLogin}
            username = {username}
            password = {password}
            handleuUsernameChange = {(e) => setUsername(e.target.value)}
            handleuPasswordChange = {(e) => setPassword(e.target.value)}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification 
          message={errorMessage || successMessage} 
          style={errorMessage? "error" : "success"} 
        />
      <div>
        {user.name} logged In
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel='login'>
        <BlogCraeteForm 
            handleCreate = {handleCreate}
            title = {title}
            author = {author}
            url = {url}
            handleTitleChange = {(e) => setTitle(e.target.value)}
            handleAuthorChange = {(e) => setAuthor(e.target.value)}
            handleUrlChange = {(e) => setUrl(e.target.value)}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
}

export default App
