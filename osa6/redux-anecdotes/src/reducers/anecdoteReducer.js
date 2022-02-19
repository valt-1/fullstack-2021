import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    const updatedAnecdote = await anecdoteService.update({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    })
    const newList = anecdotes.map(a => a.id !== id ? a : updatedAnecdote)
    dispatch(setAnecdotes(newList.sort((a1, a2) => a2.votes - a1.votes)))
  }
}

export default anecdoteSlice.reducer
