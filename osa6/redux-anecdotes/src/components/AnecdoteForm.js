import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'  
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.notify(`added "${event.target.anecdote.value}"`, 5)
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

const ConnectedAnecdoteForm = connect(
  null,
  { createAnecdote, notify }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
