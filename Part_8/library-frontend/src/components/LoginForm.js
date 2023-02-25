import React,{ useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom";
import { LOGIN } from './Queries'
import Notification from './Notification';

const LoginForm = ({ setToken }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            const errorCode = error.graphQLErrors[0].message
            setErrorMessage(errorCode)
            setTimeout(() => {
              setErrorMessage(null)
            }, 10000)
        }
      })

      useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.token
          setToken(token)
          localStorage.setItem('userToken',token )
          navigate("/")
        }
      }, [result.data]) // eslint-disable-line
    
      const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })

        setUsername('')
        setPassword('')
      }
    
      return (
        <div>
          <Notification errorMessage={errorMessage} />
          <form onSubmit={submit}>
            <div>
              username 
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password 
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </div>
      )
}


export default LoginForm