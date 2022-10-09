const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) =>{
  const calculTotal = parts.reduce((sum,part)=> sum + part.exercises,0)
  return ( 
  <strong>total of {calculTotal} exercises </strong>
  ) }

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
  </>

const Course = ({course}) =>

<div>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total parts={course.parts} />
</div>






const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App