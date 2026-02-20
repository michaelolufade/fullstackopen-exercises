import { useState } from "react";


const Header = ({content}) => {
  return (
    <>
      <h1>{content}</h1>
    </>
  )
}


const Buttons = ({ items }) => {
  return (
    <>
      {items.map(item =>
        <button key={item.name} onClick={() => item.setter(item.count + 1)}>
          {item.name}
        </button>
      )}
    </>
  )
}


const StatisticLine = ({ text, value }) => {
  return(
    <div>{text} {value}</div>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  var sum = good + neutral + bad
  const avg = (good - bad) / sum
  const pos = `${good / sum * 100} %`

  if (sum === 0) {
    return (
      <>
      <p>No Feedback Given</p>
      </>
    )
  }

  return (
    <>
      {/* <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={avg} />
      <StatisticLine text="positive" value={pos} /> */}

      <table>
        <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
        <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{sum}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{avg}</td>
        </tr><tr>
          <td>positive</td>
          <td>{pos}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const [goodCount, setGood] = useState(0)
  const [badCount, setBad] = useState(0)
  const [neutralCount, setNeutral] = useState(0)

  const items = [
    {
      name: "good",
      count: goodCount,
      setter: setGood
    },
    {
      name: "neutral",
      count: neutralCount,
      setter: setNeutral
    },
    {
      name: "bad",
      count: badCount,
      setter: setBad
    },
  ]

  return (
    <>
      <Header content={"Give Feedback"}/>
      <Buttons items={items}/>
      <Header content={"Statistics"} />
      <Statistics good={goodCount} neutral={neutralCount} bad={badCount} />
    </>
  )
}


export default App