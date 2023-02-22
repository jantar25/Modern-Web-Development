import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link 
} from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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
          <button onClick={logOut}>logout</button>
        </>
        }
      </div>
      <Routes>
        <Route path="/" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        {token?
          <Route path="/addBook" element={<NewBook />} />
          :<Route path="/login" element={<LoginForm setToken={setToken} />} />
          }
      </Routes>
    </Router>
  )
}

export default App
