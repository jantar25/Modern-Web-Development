import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name:'notification',
    initialState: null,
    reducers: {
        settingNotification(state, action) {
            return action.payload
          }
    }

})


export const { settingNotification } = notificationSlice.actions

let timeoutId = null
export const makeNotification = (content,delay) => {
  return dispatch => {
    dispatch(settingNotification(content))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        dispatch(settingNotification(null))
      }, delay*1000)
  }
}

export default notificationSlice.reducer