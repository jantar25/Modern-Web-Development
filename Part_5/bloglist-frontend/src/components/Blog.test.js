import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('render blog content', () => {
  test('HTML Tag render title&author by default', () => {
    const blog = {
      user:'1',
      title:'React test with Jest',
      likes:9,
      author:'Jantar Man',
      url:'https://testingReactapp.com'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('React test with Jest Jantar Man')
    screen.debug(element)
    expect(element).toBeDefined()
  })

  test('CSS selector Not render likes&url by default', () => {
    const blog = {
      user:'1',
      title:'React test with Jest',
      likes:9,
      author:'Jantar Man',
      url:'https://testingReactapp.com'
    }
    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blogHidden')
    screen.debug(div)
    expect(div).toBeNull()
  })
})