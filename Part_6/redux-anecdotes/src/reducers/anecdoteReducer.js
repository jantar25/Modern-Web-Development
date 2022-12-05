import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name:'anecdote',
  initialState: [],
  reducers:{
    setAnecdote(state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
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


export const { setAnecdote,createAnecdote, anecdoteVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer