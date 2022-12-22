import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(logUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <div className="container loginForm" >
      <h1>Log in to application</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control className="mb-3"
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control className="mb-3"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" type="submit" id="loginBtn">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
