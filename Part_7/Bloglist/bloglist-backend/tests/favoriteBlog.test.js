const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
  const listWithBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Statement Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  ]

  test('when list has many blogs, equals the blog has most likes', () => {
    const result = favoriteBlog(listWithBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})