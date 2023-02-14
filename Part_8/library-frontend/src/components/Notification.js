import React from 'react'

const Notification = ({errorMessage}) => {
    if ( !errorMessage ) {
        return null
      }

    return (
        <div style={{color: 'red',margin:'10px'}}>
        {errorMessage}
        </div>
    )
}

export default Notification