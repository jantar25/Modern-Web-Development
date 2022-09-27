
const Part = ({part,exercises}) => {
  return (
    <div>
        <p>
          {part} {exercises}
        </p>
    </div>
  )
} 

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({part,exercises}) => {
  return (
    <div>
      <Part part={part[0]} exercises={exercises[0]} />
      <Part part={part[1]} exercises={exercises[1]} />
      <Part part={part[2]} exercises={exercises[2]} />
    </div>
  )
}

const Total = ({exercises}) => {
  return (
    <div>
      <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part={[part1.name,part2.name,part3.name]} exercises={[part1.exercises,part2.exercises,part3.exercises]} />
      <Total exercises={[part1.exercises,part2.exercises,part3.exercises]} /> 
    </div>
  )
}

export default App
