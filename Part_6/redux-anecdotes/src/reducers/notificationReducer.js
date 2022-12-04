import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Test Notification for the user'

const notificationSlice = createSlice({
    name:'notification',
    initialState
})

export default notificationSlice.reducer