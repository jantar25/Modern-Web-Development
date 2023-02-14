import React,{useState} from 'react'
import { useQuery,useMutation } from '@apollo/client'
import { ALL_AUTHORS,EDIT_AUTHOR } from './Queries'


const Authors = () => {
  const authors = useQuery(ALL_AUTHORS)
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

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
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
      <h2>Set Birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
  )
}

export default Authors
