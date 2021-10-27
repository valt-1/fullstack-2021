import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, counter, average, positive }) => {
  if (counter === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={counter}/>
          <StatisticLine text='average' value={average}/>
          <StatisticLine text='positive' value={positive + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [counter, setCounter] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setCounter(counter + 1)
    setAverage((good + 1 - bad) / (counter + 1))
    setPositive((good + 1) / (counter + 1) * 100)
  }

  const handNeutralClick = () => {
    setNeutral(neutral + 1)
    setCounter(counter + 1)
    setAverage((good + bad) / (counter + 1))
    setPositive(good / (counter + 1) * 100)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setCounter(counter + 1)
    setAverage((good - bad - 1) / (counter + 1))
    setPositive(good / (counter + 1) * 100)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} 
                  neutral={neutral} 
                  bad={bad}
                  counter={counter} 
                  average={average}
                  positive={positive}/>
    </div>
  )
}

export default App
