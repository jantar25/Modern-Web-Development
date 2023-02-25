import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link 
} from 'react-router-dom'
import { useApolloClient,useSubscription } from '@apollo/client'
import { BOOK_ADDED,ALL_BOOKS } from './components/Queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommenation from './components/Recommenation'

// export const updateCache = (cache, query, addedBook) => {
//   // helper that is used to eliminate saving same person twice
//   const uniqByName = (a) => {
//     let seen = new Set()
//     return a.filter((item) => {
//       let k = item.name
//       return seen.has(k) ? false : seen.add(k)
//     })
//   }

//   cache.updateQuery(query, ({ allBooks }) => {
//     return {
//       allBooks: uniqByName(allBooks.concat(addedBook)),
//     }
//   })
// }

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()


  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      console.log(addedBook)
      alert(`${addedBook.title} added`)
      // updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
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
