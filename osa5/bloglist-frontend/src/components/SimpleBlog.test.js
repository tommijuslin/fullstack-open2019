import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Tommin blogi',
    author: 'Tommi Juslin',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Tommin blogi')
  expect(div).toHaveTextContent('Tommi Juslin')

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent(5)
})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Tommin blogi',
    author: 'Tommi Juslin',
    likes: 5
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})