import React from 'react'

const LoginForm = ({
    handleLogin,
    username,
    password,
    handleuUsernameChange,
    handleuPasswordChange
}) => {
  return (
    <form onSubmit={handleLogin}>
    <div>
      <label>username</label>
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleuUsernameChange}
      />
    </div>
    <div>
      <label>password</label>
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handleuPasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )
}

export default LoginForm