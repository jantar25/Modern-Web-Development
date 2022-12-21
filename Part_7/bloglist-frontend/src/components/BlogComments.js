import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment,setComment] = useState('')

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id,{ comment }))
    setComment('')
  }

  return (
    <div>
      <h3>Comments:</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          type='text'
          placeholder='comment'
          onChange={(e) => setComment(e.target.value)} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment,index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogComments