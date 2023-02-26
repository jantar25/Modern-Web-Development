import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS,USER } from './Queries'

const Recommenation = () => {
    const user = useQuery(USER)
    const filteredBooks = useQuery(ALL_BOOKS,{ variables: { genre:user.data?.me.favouriteGenre} })

    if (filteredBooks.loading) {
      return <div>loading...</div>
    }
  return (
    <div>
      <h2>recommendations</h2>
      <p>book in your favorite genre <span style={{fontWeight:'bold'}}>patterns</span></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.data.allBooks.map((a) => (
          <tr key={a.id}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommenation