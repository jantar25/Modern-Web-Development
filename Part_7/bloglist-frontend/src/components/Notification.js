import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { notification } = useSelector(state => state)


  if (notification === null) {
    return null
  }
  const indexOfSpace = notification.indexOf(' ')
  const style = notification.split(' ')[0]
  return (
    <div className={style}>{notification.substring(indexOfSpace + 1)}</div>
  )
}

export default Notification
