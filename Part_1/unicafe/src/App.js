import { useState } from 'react'

  
const Button = ({handleClick,text}) =><button onClick={handleClick}>{text}</button>

const Stat = ({stats,text,sign}) =><div>{text} {stats} {sign}</div>

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
        <Stat stats={good} text='good' sign='' />
        <Stat stats={neutral} text='neutral' sign='' />
        <Stat stats={bad} text='bad' sign='' />
        <Stat stats={allClicks.length} text='all' sign='' />
        <Stat stats={(good*1+neutral*0+bad*-1)/(allClicks.length)} text='average' sign='' />
        <Stat stats={(good/(allClicks.length))*100} text='positive' sign='%' /> 
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
