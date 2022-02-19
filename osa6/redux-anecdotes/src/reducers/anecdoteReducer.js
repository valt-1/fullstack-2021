import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const newState = state.map(a => a.id !== id ? a : updatedAnecdote)
      return newState.sort((a1, a2) => a2.votes - a1.votes)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
