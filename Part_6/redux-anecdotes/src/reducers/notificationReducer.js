import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
        settingVoteNotification(state, action) {
            return action.payload
          },
        settingAnecdoteNotification(state, action) {
            return action.payload
          },
        RemovingNotification(state, action) {
            return initialState
        }
    }

})

export const { settingVoteNotification,settingAnecdoteNotification, RemovingNotification } = notificationSlice.actions

export const setvoteNotification = (content,delay) => {
  return dispatch => {
    dispatch(settingVoteNotification(content))
      setTimeout(() => {
        dispatch(RemovingNotification())
      }, delay*1000)
  }
}

export const setNewAnecdoteNotification = (content,delay) => {
  return dispatch => {
    dispatch(settingAnecdoteNotification(content))
      setTimeout(() => {
        dispatch(RemovingNotification())
      }, delay*1000)
  }
}
export default notificationSlice.reducer