import React from 'react'

const BlogComments = ({ blog }) => {

  if(blog.comments.length === 0) {
    return <h3>No comments</h3>
  }

  return (
    <div>
      <h3>Comments:</h3>
      {blog.comments.map((comment,index) =>
        <div key={index}>{comment}</div>
      )}
    </div>
  )
}

export default BlogComments