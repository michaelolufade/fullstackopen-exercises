const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      {props.course.parts.map(part => (
        <Part name={part.name} exercise={part.exercises} />
      ))}

    </>
  )
}

const Total = (props) => {
  let sumOfExercises = 0;
  props.course.parts.forEach(part => {
    sumOfExercises += part.exercises
  })

  return (
    <>
      <p>
        Number of exercises {sumOfExercises}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App