import { createSlice } from '@reduxjs/toolkit'


const notificationReducer  = createSlice({
  name:'notification',
  initialState: null,
  reducers: {
    successNotification(state, action) {
      return action.payload
    },
    failureNotification(state, action) {
      return action.payload
    }
  }

})


export const { successNotification,failureNotification } = notificationReducer.actions

let timeoutId = null
const success = 'success'
const failure = 'error'
export const makeFailureNotification = (content,delay) => {
  return dispatch => {
    dispatch(failureNotification(failure.concat(' ',content)))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(failureNotification(null))
    }, delay*1000)
  }
}

export const makeSuccessNotification = (content,delay) => {
  return dispatch => {
    dispatch(successNotification(success.concat(' ',content)))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(successNotification(null))
    }, delay*1000)
  }
}

export default notificationReducer.reducer