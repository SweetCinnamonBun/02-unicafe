import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = (props) => {
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

  return (
    <table>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={averageNum} />
      <StatisticLine text="positive" value={positiveNum} />
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
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
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <h1>Statistics</h1>
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
