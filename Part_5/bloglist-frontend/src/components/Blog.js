import React,{ useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({
  blog,
  handleDelete,
  handleUpdate,
  user
}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{!visible? 'view' : 'hide'}</button>
      {visible &&
      <div className='blogHidden'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => handleUpdate(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user === blog.user.username &&
          <button onClick={ () => handleDelete(blog) } className='blogDeleteBtn' >remove</button>
        }
      </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog