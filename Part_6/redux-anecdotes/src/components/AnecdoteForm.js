import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { settingAnecdoteNotification, RemovingNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const [anecdote,setAnecdote] = useState('')
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
        e.preventDefault()
        dispatch(createAnecdote(anecdote))
        dispatch(settingAnecdoteNotification(anecdote))
        setTimeout(() => {
          dispatch(RemovingNotification())
        }, 5000)
        setAnecdote('')
      }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input 
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm