const Header = () => {
  const course = 'Half Stack application development'

  return (
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}


const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
      <p>
        Number of exercises {exercises1 + exercises2 + exercises3}
      </p>
    </>
  )
}

const Total = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  )
}


const App = () => {


  return (
    <>
      <Total />
    </>
  )
}

export default App