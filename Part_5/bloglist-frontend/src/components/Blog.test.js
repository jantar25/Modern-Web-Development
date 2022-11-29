import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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


describe('clicking button handler', () => {
  test('CSS selector render likes&url onclick', async () => {
    const blog = {
      user:'1',
      title:'React test with Jest',
      likes:9,
      author:'Jantar Man',
      url:'https://testingReactapp.com'
    }

    const mockHandler = jest.fn()
    const { container } = render(
      <Blog
        blog={blog}
        toggleVisibility={mockHandler}
      />
    )
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blogHidden')
    screen.debug(div)
    expect(div).toBeDefined()
    expect(div).not.toHaveStyle('display: none')
  })

  test('render twice likes on doubleclick', async () => {
    const blog = {
      user:'1',
      title:'React test with Jest',
      likes:9,
      author:'Jantar Man',
      url:'https://testingReactapp.com'
    }

    const mockHandler = jest.fn()
    const { container } = render(
      <Blog
        blog={blog}
        toggleVisibility={mockHandler}
        handleUpdate={mockHandler} />
    )
    const user = userEvent.setup()
    const togleVisibilitybtn = screen.getByText('view')
    await user.click(togleVisibilitybtn)

    const buttonlike = screen.getByText('like')
    await user.dblClick(buttonlike)
    const div = container.querySelector('.blogHidden')
    expect(div).toBeDefined()
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})