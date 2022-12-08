import React,{ useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
    const [anecdote,setAnecdote] = useState('')

    const addAnecdote = async (e) => {
        e.preventDefault()
        props.createAnecdote(anecdote)
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

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)