import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() =>
            props.store.dispatch(vote(anecdote.id),
              props.store.dispatch(showNotification(`you voted '${anecdote.content}'`),
                setTimeout(() => {
                  props.store.dispatch(
                    hideNotification(null)
                  )
                }, 5000)))
          }>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList