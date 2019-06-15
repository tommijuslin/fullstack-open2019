import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  props.anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  return (
    props.anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            props.vote(anecdote.id);
            props.showNotification(`you voted '${anecdote.content}'`);
            setTimeout(() => {
              props.hideNotification(null)
            }, 5000)
          }
          }>vote</button>
        </div>
      </div >
    )
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  vote,
  showNotification,
  hideNotification
}

const connectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList