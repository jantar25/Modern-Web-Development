import React from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <Router>
      <div>
        <button>
          <Link style={{textDecoration:'none'}} to="/">authors</Link>
        </button>
        <button>
          <Link style={{textDecoration:'none'}} to="/books">books</Link>
        </button>
        <button>
          <Link style={{textDecoration:'none'}} to="/addBook">add book</Link>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBook" element={<NewBook />} />
      </Routes>
    </Router>
  )
}

export default App
