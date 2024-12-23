const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.course.name} {props.course.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part =>
        <Part key={part.id} course={part} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator,current) => accumulator + current.exercises,0) 
  return <p><b>total of exercises {total}</b></p>
}

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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
      }
    ]
  }
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
