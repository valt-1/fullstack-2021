import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 2,
    backgroundColor: '#fce3f9',
    margin: 3
  }

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  if (!showAll) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleShowAll}>view</button>
      </div>  
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShowAll}>hide</button><br/>
      {blog.url}<br/>
      likes: {blog.likes} <button>like</button><br/>
      {blog.user.name}
    </div>  
  )
}

export default Blog
