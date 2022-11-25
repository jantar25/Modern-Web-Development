import React,{ useState } from "react"


const Blog = ({blog,handleDelete,user}) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogDeleteBtnStyle = {
    background: '#00BFFF',
    padding: 2,
    margin: 5,
    border:'none',
    borderRadius:5,
    cursor:'pointer',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={toggleVisibility}>{!visible? 'view' : 'hide'}</button>
    {visible &&
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} 
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user === blog.user.username &&
          <button onClick={ () =>handleDelete(blog) } style={blogDeleteBtnStyle}>remove</button>
        }
      </div>
    }
  </div>  
  )
}

export default Blog