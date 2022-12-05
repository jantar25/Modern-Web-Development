import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const { anecdote,filter } = useSelector(state => state)
    const sortedAnecdote = [...anecdote].sort((a, b) => b.votes - a.votes)

    const vote = (annectode) => {
      const updatedObject = {...annectode,votes:annectode.votes + 1 }
      dispatch(voteAnecdote(updatedObject))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList