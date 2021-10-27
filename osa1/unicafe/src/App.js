import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Stats = ({ text, stats }) => {
  return (
    <div>{text} {stats}</div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [counter, setCounter] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setCounter(counter + 1)
    setAverage((good + 1 - bad) / (counter + 1))
  }

  const handNeutralClick = () => {
    setNeutral(neutral + 1)
    setCounter(counter + 1)
    setAverage((good + bad) / (counter + 1))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setCounter(counter + 1)
    setAverage((good - bad - 1) / (counter + 1))
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Stats text='good' stats={good}/>
      <Stats text='neutral' stats={neutral}/>
      <Stats text='bad' stats={bad}/>
      <Stats text='all' stats={counter}/>
      <Stats text='average' stats={average}/>
    </div>
  )
}

export default App
