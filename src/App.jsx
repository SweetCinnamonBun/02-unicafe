import { useState } from "react";
import "./App.css";
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick} className="button">
    {text}
  </button>
);

const StatisticLine = (props) => {
  if (props.text == "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
        <td>%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedback given.</div>;
  }

  let averageNum = 0;
  const positiveList = [];
  let positiveNum = 0;
  if (props.average.length > 0) {
    let sum = 0;
    props.average.forEach((element) => {
      sum = sum + element;
      if (element > 0) {
        positiveList.push(element);
      }
    });
    averageNum = sum / props.average.length;
    positiveNum = (positiveList.length / props.average.length) * 100;
  }

  let averageNumber = averageNum.toFixed(2);
  let positiveNumber = positiveNum.toFixed(2);

  return (
    <div className="stat-container">
      <table className="stat-table">
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={averageNumber} />
        <StatisticLine text="positive" value={positiveNumber} />
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState([]);

  const handleClickGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    setAll(all + 1);
    setAverage(average.concat(1));
  };
  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setAll(all + 1);
    setAverage(average.concat(0));
  };
  const handleClickBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setAll(all + 1);
    setAverage(average.concat(-1));
  };

  return (
    <div className="container">
      <h1 className="heading-1">Give Feedback</h1>
      <div className="button-container">
        <Button handleClick={handleClickGood} text="good" />
        <Button handleClick={handleClickNeutral} text="neutral" />
        <Button handleClick={handleClickBad} text="bad" />
      </div>
      <h1 className="stats">Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
      />
    </div>
  );
};

export default App;
