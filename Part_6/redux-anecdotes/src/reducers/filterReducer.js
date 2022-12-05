import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        settingFilter(state, action) {
            return state = action.payload
          },
    }
})

export const { settingFilter } = filterSlice.actions
export default filterSlice.reducer