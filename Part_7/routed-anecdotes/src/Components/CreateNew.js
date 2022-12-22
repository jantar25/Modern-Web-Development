import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
    const navigate = useNavigate()
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content:content.fields.value,
        author:author.fields.value,
        info:info.fields.value,
        votes: 0
      })
      navigate('/')
    }

    const handleReset = () => {
      info.reset()
      author.reset()
      content.reset()
    }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} />
        </div>
        <div>
          author
          <input {...author.fields} />
        </div>
        <div>
          url for more info
          <input {...info.fields} />
        </div>
        <div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>reset</button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew