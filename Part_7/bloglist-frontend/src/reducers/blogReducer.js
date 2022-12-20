import { createSlice } from '@reduxjs/toolkit'
import { makeFailureNotification,makeSuccessNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name:'blog',
  initialState:[],
  reducers:{
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((b) =>
        b.id !== id ? b : { ...b, likes: action.payload.likes }
      )
    },
    deletionBlog(state, action) {
      const id = action.payload
      return state.filter((b) => b.id !== id)
    }
  }
})

const { setBlog,appendBlog,updateBlog,deletionBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(makeSuccessNotification(`A new blog '${newBlog.title}' by ${newBlog.author} added`, 5))
    } catch (error) {
      dispatch(makeFailureNotification(error.response.data.error, 5))
    }

  }
}

export const likeBlog = (id,updatedObject) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.updateBlog(id,updatedObject)
      dispatch(updateBlog(updatedBlog))
      dispatch(makeSuccessNotification(`you liked '${updatedBlog.title}'`, 5))
    } catch (error) {
      dispatch(makeFailureNotification(error.response.data.error, 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch(deletionBlog(id))
      dispatch(makeSuccessNotification('Deleted Successfully', 5))
    } catch (error) {
      dispatch(makeFailureNotification(error.response.data.error, 5))
    }

  }
}

export default blogSlice.reducer