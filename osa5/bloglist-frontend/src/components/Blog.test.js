import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('Only blog title and author are rendered', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 999
  }

  render (<Blog blog={blog}/>)

  const options = { exact: false }

  const title = screen.getByText('React patterns', options)
  const author = screen.getByText('Michael Chan', options)
  expect(title).toBeDefined()
  expect(author).toBeDefined()

  const url = screen.queryByText('https://reactpatterns.com/', options)
  const likes = screen.queryByText('999', options)
  expect(url).toBeNull()
  expect(likes).toBeNull()
})
