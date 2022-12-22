import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { Form,Button } from 'react-bootstrap'

const BlogComments = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment,setComment] = useState('')

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id,{ comment }))
    setComment('')
  }

  return (
    <div className='container my-4'>
      <h3>Comments:</h3>
      <Form onSubmit={handleComment} className="mb-4">
        <Form.Control className="mb-1"
          value={comment}
          type='text'
          placeholder='comment'
          onChange={(e) => setComment(e.target.value)} />
        <Button type='submit'>add comment</Button>
      </Form>
      <ul>
        {blog.comments.map((comment,index) =>
          <li key={index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogComments