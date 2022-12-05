import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { settingVoteNotification, RemovingNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const { anecdote,filter } = useSelector(state => state)
    const sortedAnecdote = [...anecdote].sort((a, b) => b.votes - a.votes)

    const voteAnecdote = (annectode) => {
      dispatch(anecdoteVote(annectode.id))
      dispatch(settingVoteNotification(annectode.content))
      setTimeout(() => {
        dispatch(RemovingNotification())
      }, 5000)
    }
  
  return (
    <div>
    {sortedAnecdote
      .filter(anecdote => 
        anecdote
          .content.toLowerCase()
          .includes(filter.toLowerCase()))
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList