import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    published
    author
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedInt,
    genres: $genres
  ) {
    id
    title
    published
    author
  }
}
`

export const EDIT_AUTHOR = gql`
mutation UpdateAuthor($name: String!, $bornInt: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $bornInt,
  ) {
    id
    name
    born
  }
}
`
