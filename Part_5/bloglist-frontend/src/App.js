import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

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


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification 
          message={errorMessage || successMessage} 
          style={errorMessage? "error" : "success"} 
        />
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input
              type="text"
              value={username}
              name="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>password</label>
            <input
              type="password"
              value={password}
              name="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
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
      <div>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            <label>tittle</label>
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>author</label>
            <input
              type="text"
              value={author}
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label>url</label>
            <input
              type="text"
              value={url}
              name="url"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
  )
}

export default App
