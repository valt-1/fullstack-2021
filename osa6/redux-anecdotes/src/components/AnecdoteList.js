import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const style = {
    padding: 5
  }

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(a => {
      return a.content.toLowerCase().includes(filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(notify(`voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(notify(null))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id} style={style}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
