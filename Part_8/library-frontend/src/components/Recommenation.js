import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS,USER } from './Queries'

const Recommenation = () => {
    const books = useQuery(ALL_BOOKS)
    const user = useQuery(USER)

    if (books.loading || user.loading) {
      return <div>loading...</div>
    }
    const favouriteGenre = user.data.me.favouriteGenre
    const filteredBooks = books.data.allBooks.filter(book => book.genres.includes(favouriteGenre))
  
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
          {filteredBooks.map((a) => (
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