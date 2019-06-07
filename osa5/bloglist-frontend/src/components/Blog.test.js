import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('at start only title and author are displayed', () => {
  const blog = {
    title: 'Tommin blogi',
    author: 'Tommi Juslin',
    url: 'www.tomminblogi.fi',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Tommin blogi')
  expect(div).toHaveTextContent('Tommi Juslin')
  expect(div).not.toHaveTextContent('www.tomminblogi.fi')
})