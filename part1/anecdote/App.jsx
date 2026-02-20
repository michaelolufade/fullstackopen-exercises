import { useState } from 'react'


const updateVotes = (selected, votes, setVotes) => {
  const new_selected = votes[selected] + 1
  const new_votes = { ...votes }
  new_votes[selected] =  new_selected
  setVotes(new_votes)
}


const Header = ({ content }) => {
  return(
    <h1>{content}</h1>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0
  })

  return (
    <>
      <Header content="Anecdote of the Day" />
      <div>
        {anecdotes[selected]}
      </div>
      <button onClick={() => updateVotes(selected, votes, setVotes)}>
        vote
      </button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>
        next anecdote
      </button>
      <Header content="Anecdote with the most votes" />
      <div>
        {anecdotes[Object.keys(votes).reduce((a, b) =>
          votes[a] > votes[b] ? a : b)]}
      </div>
    </>
  )
}

export default App