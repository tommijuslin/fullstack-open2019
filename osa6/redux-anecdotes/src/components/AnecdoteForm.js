import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    props.store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    props.store.dispatch(
      showNotification(`new anecdote added '${event.target.anecdote.value}'`)
    )
    setTimeout(() => {
      props.store.dispatch(
        hideNotification(null)
      )
    }, 5000)
    event.target.anecdote.value = ''

  }
  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm