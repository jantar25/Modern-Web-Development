import { useState } from 'react'

  
const Button = ({handleClick,text}) =><button onClick={handleClick}>{text}</button>

const Statistics = ({stats,text,sign}) =><div>{text} {stats} {sign}</div>



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
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
        <div>
          <Statistics stats={good} text='good' sign='' />
          <Statistics stats={neutral} text='neutral' sign='' />
          <Statistics stats={bad} text='bad' sign='' />
          <Statistics stats={bad+neutral+good} text='all' sign='' />
          <Statistics stats={(good*1+neutral*0+bad*-1)/(bad+neutral+good)} text='average' sign='' />
          <Statistics stats={(good/(bad+neutral+good))*100} text='positive' sign='%' />
        </div>
      </div>
    </div>
  )
}

export default App
