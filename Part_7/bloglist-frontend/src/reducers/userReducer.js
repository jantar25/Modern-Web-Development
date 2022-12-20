import { createSlice } from '@reduxjs/toolkit'
import { makeFailureNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name:'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  }
})

const { setUser } = userSlice.actions

export const initializeUser = user => {
  return async dispatch => {
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const logUser = userObject => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(makeFailureNotification(error.response.data.error, 5))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(setUser(null))
  }
}

export default userSlice.reducer