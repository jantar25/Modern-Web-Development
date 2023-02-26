import React,{useState} from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from './Queries'


const Authors = ({token,authors}) => {
  const [name,setName] = useState('')
  const [born,setBorn] = useState('')
  const bornInt = parseInt(born)
  
  
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  const updateAuthor = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name, bornInt } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {token && 
      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={updateAuthor}>
          <select onChange={({ target }) => setName(target.value)}>
            {authors.data.allAuthors.map(author =>
              <option key={author.id} value={author.name}>{author.name}</option>
              )}
          </select>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update Author</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Authors
