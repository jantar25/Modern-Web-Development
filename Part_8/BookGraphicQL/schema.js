const typeDefs = `
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author! 
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount:Int
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    token: String!
  }

  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author: String,genre: String): [Book]
    allAuthors:[Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String! 
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs