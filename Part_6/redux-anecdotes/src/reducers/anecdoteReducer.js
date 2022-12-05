import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdode'
import { settingAnecdoteNotification, RemovingNotification } from './notificationReducer'

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
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const VotedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes +1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : VotedAnecdote 
      )
    }
  }
})

export const { setAnecdote,appendAnecdote, anecdoteVote } = anecdoteSlice.actions

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
    dispatch(settingAnecdoteNotification(newAnecdote.content))
    setTimeout(() => {
      dispatch(RemovingNotification())
    }, 5000)
  }
}

export default anecdoteSlice.reducer