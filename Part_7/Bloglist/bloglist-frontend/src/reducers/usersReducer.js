import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const usersSlice = createSlice({
  name:'users',
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

const { setUsers } = usersSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer