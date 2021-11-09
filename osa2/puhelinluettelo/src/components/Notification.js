import React from 'react'

const Notification = ({ message }) => {
  const style = {
    color: 'seagreen',
    background: 'aquamarine',
    borderRadius: 10,
    padding: 8
  }
  
  if (message === null) {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
