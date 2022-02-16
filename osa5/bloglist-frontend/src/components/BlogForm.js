import React from 'react'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h3>add blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='blogTitle'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='blogAuthor'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='blogUrl'
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
