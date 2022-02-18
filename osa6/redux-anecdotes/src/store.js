import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({ 
  reducer: {
    notification: notificationReducer,
    anecdotes: anecdoteReducer
  } 
})

export default store
