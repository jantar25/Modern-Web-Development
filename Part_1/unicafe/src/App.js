import { useState } from 'react'

  
const Button = ({handleClick,text}) =><button onClick={handleClick}>{text}</button>

const Text = ({stats,text}) =><div>{text} {stats}</div>



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
          <Text stats={good} text='good' />
          <Text stats={neutral} text='neutral' />
          <Text stats={bad} text='bad' />
        </div>
      </div>
    </div>
  )
}

export default App
