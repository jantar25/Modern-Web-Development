import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdode'
import { makeNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState: [],
  reducers:{
    setAnecdote(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    anecdoteVote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload 
      )
    }
  }
})

const { setAnecdote,appendAnecdote, anecdoteVote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(makeNotification(`New Created '${newAnecdote.content}'`, 5))
  }
}

export const voteAnecdote = updatedObject => {
    return async dispatch => {
      const updatedAnecdote = await anecdoteService.updateAnecdote(updatedObject)
      dispatch(anecdoteVote(updatedAnecdote))
      dispatch(makeNotification(`you voted '${updatedAnecdote.content}'`, 5))
    }
}

export default anecdoteSlice.reducer