import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const { notification } = useSelector(state => state)


  if (notification === null) {
    return null
  }
  const indexOfSpace = notification.indexOf(' ')
  const style = notification.split(' ')[0]
  return (
    <div className="container">
      <Alert variant={style}>
        {notification.substring(indexOfSpace + 1)}
      </Alert>
    </div>
  )
}

export default Notification
