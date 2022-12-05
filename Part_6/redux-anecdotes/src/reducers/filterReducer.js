import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        settingFilter(state, action) {
            return action.payload
          },
    }
})

export const { settingFilter } = filterSlice.actions
export default filterSlice.reducer