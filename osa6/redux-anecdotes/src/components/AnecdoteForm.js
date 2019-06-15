import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    props.showNotification(`new anecdote added '${event.target.anecdote.value}'`)
    setTimeout(() => {
      props.hideNotification(null)
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

const mapDispatchToProps = {
  createAnecdote,
  showNotification,
  hideNotification
}

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm