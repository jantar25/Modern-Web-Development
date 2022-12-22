import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: usersReducer,
    user: userReducer,
    notification:notificationReducer,
  }
})

export default store