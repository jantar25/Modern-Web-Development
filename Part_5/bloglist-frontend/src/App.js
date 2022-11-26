import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogCraeteForm from './components/BlogCraeteForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const blogFormRef = useRef()


//LOGIN
  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(error)
    }
  }

  
  //LOG OUT
  const handleLogout = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

    //ADD BLOG
    const handleCreate = async (blogObject) => {
      blogFormRef.current.toggleVisibility()
      try {
        const blog = await blogService.create(blogObject)
        setBlogs(blogs.concat(blog))
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

    //DELETE A BLOG
    const handleDelete = async (blog) => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        try {
          await blogService.deleteBlog(blog.id)
          setBlogs(blogs.filter(b => b.id !== blog.id))
          setSuccessMessage(`Deleted Successfully`)
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
    }

    //UPDATE BLOG
    const handleUpdate = async (blog) => {
      const blogToUpdate = {
        user:blog.user.id, 
        likes:blog.likes + 1,
        title:blog.title,
        author:blog.author,
        url:blog.url
      }
      try {
        const updatedBlog = await blogService.updateBlog(blog.id,blogToUpdate)
        setBlogs(blogs.map(b => b.id !== blog.id ? b : {...b,likes:updatedBlog.data.likes}))
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
        <LoginForm Login = {handleLogin} />
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
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogCraeteForm createBlog = {handleCreate} />
      </Togglable>
      {blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => 
          <Blog 
          key={blog.id} 
          blog={blog} 
          handleDelete={handleDelete}
          handleUpdate={handleUpdate} 
          user={user.username}
          />
        )}
  </div>
  )
}

export default App
