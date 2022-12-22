import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <div>{blog.title}</div>
      <div>{blog.author}</div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
