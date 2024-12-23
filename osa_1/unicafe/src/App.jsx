import { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Display = props => <div>{props.text} {props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    //console.log(newGood)
    setGood(newGood)
  }

  const handleBadClick = () => {
    const newBad = bad + 1
    //console.log(newBad)
    setBad(newBad)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    //console.log(newNeutral)
    setNeutral(newNeutral)
  }

  const numberOfReviews = () => {
    return good + bad + neutral
  }

  const calculateAverage = () => {
    const cumatedReviews = good - bad
    return cumatedReviews / numberOfReviews()
  }

  const positivePercentage = () => {
    return (`${good * 100 / numberOfReviews()} %`)
  }

  return (
    <div>
      <Title title = {"give feedback"}/>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Title title = {"statistics"}/>
      <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/>
      <Display text="all" value={numberOfReviews()} />
      <Display text="Average" value={calculateAverage()} />
      <Display text="positive" value={positivePercentage()} />
    </div>
  )
}

export default App
