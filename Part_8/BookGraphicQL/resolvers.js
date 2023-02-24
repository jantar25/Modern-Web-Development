const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./Models/Book')
const Author = require('./Models/Author')
const User = require('./Models/User')

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
  
      allAuthors: async() => {
        const authors = await Author.find({})
        const books = await Book.find({}).populate('author', { name: 1, id:1, born:1 })
        const fullAuthor = authors.map(author => ({
        name:author.name,
        id:author.id,
        born:author.born,
        bookCount:(books.filter(book =>
          book.author.name === author.name).length
          )
        })
      )
  
      return fullAuthor
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
  
    Mutation: {
      addBook: async (root, args,{ currentUser }) => {
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const existingAuthor = await Author.findOne({ name: args.author })
        if (!existingAuthor) {
          const newAuthor = new Author({ name: args.author })
          try {
            const savedAuthor = await newAuthor.save()
            const book = new Book({...args,author:savedAuthor.id})
            let savedBook = await book.save()
            savedBook = await savedBook.populate('author', { name: 1, id:1, born:1 })
            return savedBook
          } catch (error) {
            throw new GraphQLError('Saving Book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
        }
        try {
          const book = new Book({...args,author:existingAuthor.id})
          let savedBook = await book.save()
          savedBook = await savedBook.populate('author', { name: 1, id:1, born:1  })
          return savedBook
        } catch (error) {
          throw new GraphQLError('Saving Book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }
      },
  
      editAuthor: async (root, args,{ currentUser }) => {
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        author.born = args.setBornTo 
        try {
          const updatedAuthor = await author.save()
          return updatedAuthor
        } catch (error) {
          throw new GraphQLError('Saving Born date failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.setBornTo,
              error
            }
          })
        }
      },
  
      createUser: async (root, args) => {
        const user = new User({ ...args })
        try {
          const savedUser = await user.save()
          return savedUser
        } catch (error) {
          throw new GraphQLError('Creating the Author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        }
      },
  
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.name,
          id: user._id,
        }
    
        const userInfo = { 
          username: user.username,
          favouriteGenre: user.favouriteGenre,
          id: user._id,
          token: jwt.sign(userForToken, process.env.JWT_SECRET) 
        }
  
        return userInfo
      },
    }
  }

  module.exports = resolvers