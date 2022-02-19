import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'  
import { notify } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notify(`added "${event.target.anecdote.value}"`))
    setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
      </form><br/>
    </div>
  )
}

export default AnecdoteForm
