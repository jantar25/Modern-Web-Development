import { createSlice } from '@reduxjs/toolkit'


const notificationReducer  = createSlice({
  name:'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }

})


export const { setNotification } = notificationReducer.actions

let timeoutId = null
const success = 'success'
const failure = 'error'
export const makeFailureNotification = (content,delay) => {
  return dispatch => {
    dispatch(setNotification(failure.concat(' ',content)))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, delay*1000)
  }
}

export const makeSuccessNotification = (content,delay) => {
  return dispatch => {
    dispatch(setNotification(success.concat(' ',content)))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, delay*1000)
  }
}

export default notificationReducer.reducer