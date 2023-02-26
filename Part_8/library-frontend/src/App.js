import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link 
} from 'react-router-dom'
import { useApolloClient,useSubscription,useQuery } from '@apollo/client'
import { BOOK_ADDED,ALL_BOOKS,ALL_AUTHORS } from './components/Queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommenation from './components/Recommenation'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    const newBooks = uniqByName(allBooks.concat(addedBook))
    return {
      allBooks: newBooks,
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (books.loading || authors.loading)  {
    return <div>loading...</div>
  }

  return (
    <Router>
      <div>
        <button>
          <Link style={{textDecoration:'none'}} to="/">authors</Link>
        </button>
        <button>
          <Link style={{textDecoration:'none'}} to="/books">books</Link>
        </button>
        {!token? 
        <button>
          <Link style={{textDecoration:'none'}} to="/login">login</Link>
        </button> :
        <>
          <button>
            <Link style={{textDecoration:'none'}} to="/addBook">add book</Link>
          </button>
          <button>
            <Link style={{textDecoration:'none'}} to="/recommend">recommend</Link>
          </button>
          <button onClick={logOut}>logout</button>
        </>
        }
      </div>
      <Routes>
        <Route path="/" element={<Authors token={token} authors={authors} />} />
        <Route path="/books" element={<Books books={books} />} />
        {token?
          <>
            <Route path="/recommend" element={<Recommenation />} />
            <Route path="/addBook" element={<NewBook />} />
          </>
          :<Route path="/login" element={<LoginForm setToken={setToken} />} />
          }
      </Routes>
    </Router>
  )
}

export default App
