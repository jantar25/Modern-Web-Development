import React from 'react'

const Notification = ({ notification }) => {
    const style = {
        border: 'solid red',
        padding: 10,
        borderWidth: 1
      }
  return (
    <div>{notification &&
          <div style={style}>{notification}</div>}
    </div>
  )
}

export default Notification



