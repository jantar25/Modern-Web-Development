import { useState } from 'react'


const Books = ({books}) => {
  
  const [filteredBooks,setFilteredBooks] = useState()

  const genres = [...new Set(
    books.data.allBooks.reduce((newGenres,book) => newGenres.concat(book.genres), [])
  )]

  const filterBooks = (sort) => {
    const filteredBooks = sort === 'all'? books.data.allBooks
     : books.data.allBooks.filter(book => book.genres.includes(sort))
     setFilteredBooks(filteredBooks)
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!filteredBooks? books.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
        : filteredBooks.map((a) => (
          <tr key={a.id}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
        ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre,index)=>
        <button onClick={()=>filterBooks(genre)} key={index}>{genre}</button>) }
        <button onClick={()=>filterBooks('all')}>All genres</button>
      </div>
    </div>
  )
}

export default Books
