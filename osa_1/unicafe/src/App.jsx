import { useState } from 'react'

const Title = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = props => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  if (props.statistics.numberOfReviews===0) {
    return (
      <>
        <Title title = {"statistics"}/>
        <p>No feedback given</p>
      </>
    ) 
  }
  return (
    <>
      <Title title = {"statistics"}/>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.statistics.good}/>
          <StatisticLine text="neutral" value={props.statistics.neutral}/>
          <StatisticLine text="bad" value={props.statistics.bad}/>
          <StatisticLine text="all" value={props.statistics.numberOfReviews} />
          <StatisticLine text="average" value={props.statistics.calculateAverage} />
          <StatisticLine text="positive" value={props.statistics.positivePercentage} />
        </tbody>
      </table>
    </>
  )
}

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
    const cumulatedReviews = good - bad
    return cumulatedReviews / numberOfReviews()
  }

  const positivePercentage = () => {
    return (`${good * 100 / numberOfReviews()} %`)
  }

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    numberOfReviews: numberOfReviews(),
    calculateAverage: calculateAverage(),
    positivePercentage: positivePercentage()
  }

  return (
    <>
      <Title title = {"give feedback"}/>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics statistics={statistics} />
    </>
  )
}

export default App
