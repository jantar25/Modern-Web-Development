const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


//GET ALL USERS
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

//ADD ONE USER
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const existingUser = await User.findOne({ username:username })
  if(existingUser){
    return response.status(400).json({
      error: 'User with same username already exist'
    })
  } else if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must have more than 3 characters each.'
    })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter