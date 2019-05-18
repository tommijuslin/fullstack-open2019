import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => <h1>Anecdote of the day</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const VotesDisplay = ({ votes }) => <div>has {votes} votes</div>

const MostVotesDisplay = ({ anecdotes,votes }) => {
  var max = 0;
  var indexOfMax = 0;
  for(var i = 0; i < 6; i++) {
    if (votes[i] > max) {
      max = votes[i]
      indexOfMax = i;
    }
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[indexOfMax]}
      <VotesDisplay votes={max} />
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const setToValue = (value) => setSelected(value)
  const randomNumber = () => Math.floor(Math.random() * (5 - 0 + 1))
  
  const handleVote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Header/>
      {props.anecdotes[selected]}
      <VotesDisplay votes={votes[selected]} />
      <div>
        <Button handleClick={handleVote} text='vote' />
        <Button
          handleClick={() => setToValue(randomNumber)}
          text='next anecdote'
        />
      </div>
      <MostVotesDisplay anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)