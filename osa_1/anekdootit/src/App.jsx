import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Title = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const App = () => {

  const pickAnecdote = () => {
    let index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index)
  }

  const addVote = () => {
    const newVotes = {...points}
    const newNumberOfVotes = newVotes[selected] + 1
    newVotes[selected] = newNumberOfVotes
    setPoints(newVotes)

    if (newNumberOfVotes > mostVoted.votes) {
      const newMostVoted = {index:selected,votes:newNumberOfVotes}
      setMostVoted(newMostVoted)
    }
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5:0, 6:0, 7:0 })
  const [mostVoted,setMostVoted] = useState({index:0,votes:0})

  return (
      <div>
      <Title title = {"Anecdote of the day"}/>
      <p>{anecdotes[selected]} <br/>
      has {points[selected]} votes</p>
      
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={pickAnecdote} text="next anecdote" />

      <Title title = {"Most voted anecdote"}/>
      <p>{anecdotes[mostVoted.index]} <br/>
      has {mostVoted.votes} votes</p>
    </div>
  )
}

export default App