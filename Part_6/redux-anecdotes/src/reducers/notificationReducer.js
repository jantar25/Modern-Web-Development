import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
        settingVoteNotification(state, action) {
            return `you voted '${action.payload}'`
          },
        settingAnecdoteNotification(state, action) {
            return `you added '${action.payload}'`
          },
        RemovingNotification(state, action) {
            return initialState
        }
    }
})

export const { settingVoteNotification,settingAnecdoteNotification, RemovingNotification } = notificationSlice.actions
export default notificationSlice.reducer