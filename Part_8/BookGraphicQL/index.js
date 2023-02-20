const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const Book = require('./Models/Book')
const Author = require('./Models/Author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

  mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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
  }

  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author: String,genre: String): [Book]
    allAuthors:[Author!]!
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
  }
`

const resolvers = {
  Query: {
    bookCount: async() => (await Book.find({})).length,
    authorCount: async() => ( await Author.find({})).length,
    allBooks: async (root, args) => {
      if(args.author&&args.genre) {
        const booksByAuthorAndGenre = 
        await Book
        .find( { author:args.author, genres:args.genre })
        .populate('author', { name: 1, id:1, born:1 })

        return booksByAuthorAndGenre

      } else if (args.author) {
        const booksByAuthor = 
        await Book
        .find({author:args.author})
        .populate('author', { name: 1, id:1, born:1 })

        return booksByAuthor

      } else if (args.genre) {
        const booksByGenre = 
        await Book
        .find({genres:args.genre})
        .populate('author', { name: 1, id:1, born:1 })

        return booksByGenre

      } else {
        const books = 
        await Book
        .find({})
        .populate('author', { name: 1, id:1, born:1 })
        
        return books
      }
    },

    allAuthors: async() => await Author.find({})
    
    // authors.map(author => ({
    //   ...author,
    //   bookCount:(books.filter(book =>
    //     book.author === author.name).length
    //     )
    //   })
    // ),
  },

  Mutation: {
    addBook: async (root, args) => {
      const existingAuthor = await Author.findOne({ name: args.author })

      if (!existingAuthor) {
        try {
          const newAuthor = new Author({ name: args.author })
          const savedAuthor = await newAuthor.save()
          const book = new Book({...args,author:savedAuthor.id})
          let savedBook = await book.save()
          savedBook = await savedBook.populate('author', { name: 1, id:1, born:1 })
        } catch (error) {
          throw new GraphQLError('Saving Book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
        return savedBook
      }
      try {
        const book = new Book({...args,author:existingAuthor.id})
        let savedBook = await book.save()
        savedBook = await savedBook.populate('author', { name: 1, id:1, born:1  })
      } catch (error) {
        throw new GraphQLError('Saving Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      return savedBook
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo 
      try {
        updatedAuthor = await author.save()
      } catch (error) {
        throw new GraphQLError('Saving Born date failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})