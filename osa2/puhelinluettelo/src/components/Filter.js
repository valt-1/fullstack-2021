import React from 'react'

const Filter = ({ filterStr, handleFilterStrChange }) => {
  return (
    <p>
      filter shown with 
      <input 
        value={filterStr}
        onChange={handleFilterStrChange}
      />
    </p>
  )
}  

export default Filter
