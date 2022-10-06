import { useState } from 'react'

  
const Button = ({handleClick,text}) =><button onClick={handleClick}>{text}</button>

const StatisticLine  = ({value,text,sign}) =>{
  return (  
    <tr>
      <td>{text}</td>
      <td>{value}</td>
      <td>{sign}</td>
    </tr>)
}

const Statistics = ({allClicks,good,neutral,bad}) => {
  if (allClicks.length === 0) {
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
          <StatisticLine  value={good} text='good' sign='' />
          <StatisticLine  value={neutral} text='neutral' sign='' />
          <StatisticLine  value={bad} text='bad' sign='' />
          <StatisticLine  value={allClicks.length} text='all' sign='' />
          <StatisticLine  value={(good*1+neutral*0+bad*-1)/(allClicks.length)} text='average' sign='' />
          <StatisticLine  value={(good/(allClicks.length))*100} text='positive' sign='%' /> 
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const handleGoodClick = () => {
    setAllClicks(allClicks.concat('g'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAllClicks(allClicks.concat('n'))
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAllClicks(allClicks.concat('b'))
    setBad(bad + 1)
  }
  
  

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <div>
          <Button handleClick={handleGoodClick} text='good' /> 
          <Button handleClick={handleNeutralClick} text='neural' />
          <Button handleClick={handleBadClick} text='bad' />
        </div>
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} allClicks={allClicks} />
      </div>
    </div>
  )
}

export default App
