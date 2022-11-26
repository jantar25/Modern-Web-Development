import React from 'react'

const Notification = ({ message,style }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={style ==='error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification