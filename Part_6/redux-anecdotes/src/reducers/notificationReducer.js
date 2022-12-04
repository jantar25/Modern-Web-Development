import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
        settingVoteNotification(state, action) {
            return state =`you voted '${action.payload}'`
          },
          settingAnecdoteNotification(state, action) {
            return state =`you added '${action.payload}'`
          },
        RemovingNotification(state, action) {
            return state = initialState
        }
    }
})

export const { settingVoteNotification,settingAnecdoteNotification, RemovingNotification } = notificationSlice.actions
export default notificationSlice.reducer