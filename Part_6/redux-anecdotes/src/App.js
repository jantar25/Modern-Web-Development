import React,{ useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteOf,createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const [anecdote,setAnecdote] = useState('')
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    dispatch(createAnecdote(anecdote))
    setAnecdote('')
  }

  const vote = (id) => {
    dispatch(voteAnecdoteOf(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
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

export default App