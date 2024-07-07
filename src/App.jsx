import { useState, useMemo, useCallback } from "react";

// Function to perform heavy calculation
const heavyCalculation = (num) => {
  console.time("Calculation time");
  let result = 0;
  for (let i = 0; i < 500000000; i++) {
    result += num;
  }
  console.timeEnd("Calculation time");
  return result;
};

// Component without using useMemo and useCallback
const WithoutMemoization = ({ num }) => {
  const [count, setCount] = useState(0);

  const result = heavyCalculation(num);

  const handleClick = () => {
    console.time("handleClick execution time (without Memoization)");
    setCount(count + 1);
    console.timeEnd("handleClick execution time (without Memoization)");
  };

  console.time("Rendering time (without Memoization)");
  const output = (
    <div>
      <p>Result: {result}</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
  console.timeEnd("Rendering time (without Memoization)");

  return output;
};

// Component using only useMemo
const WithUseMemoOnly = ({ num }) => {
  const [count, setCount] = useState(0);

  const result = useMemo(() => heavyCalculation(num), [num]);

  const handleClick = () => {
    console.time("handleClick execution time (useMemo only)");
    setCount(count + 1);
    console.timeEnd("handleClick execution time (useMemo only)");
  };

  console.time("Rendering time (useMemo only)");
  const output = (
    <div>
      <p>Result: {result}</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
  console.timeEnd("Rendering time (useMemo only)");

  return output;
};

// Component using only useCallback
const WithUseCallbackOnly = ({ num }) => {
  const [count, setCount] = useState(0);

  const result = heavyCalculation(num);

  const handleClick = useCallback(() => {
    console.time("handleClick execution time (useCallback only)");
    setCount((prevCount) => prevCount + 1);
    console.timeEnd("handleClick execution time (useCallback only)");
  }, []);

  console.time("Rendering time (useCallback only)");
  const output = (
    <div>
      <p>Result: {result}</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
  console.timeEnd("Rendering time (useCallback only)");

  return output;
};

// Component using both useMemo and useCallback
const WithMemoization = ({ num }) => {
  const [count, setCount] = useState(0);

  const result = useMemo(() => heavyCalculation(num), [num]);

  const handleClick = useCallback(() => {
    console.time("handleClick execution time (with Memoization)");
    setCount((prevCount) => prevCount + 1);
    console.timeEnd("handleClick execution time (with Memoization)");
  }, []);

  console.time("Rendering time (with Memoization)");
  const output = (
    <div>
      <p>Result: {result}</p>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
  console.timeEnd("Rendering time (with Memoization)");

  return output;
};

const App = () => {
  return (
    <div>
      <h1>Test useMemo / useCallback</h1>
      <h2>Without both useMemo and useCallback</h2>
      <WithoutMemoization num={10} />
      <h2>With useMemo only</h2>
      <WithUseMemoOnly num={10} />
      <h2>With useCallback only</h2>
      <WithUseCallbackOnly num={10} />
      <h2>With both useMemo and useCallback</h2>
      <WithMemoization num={10} />
    </div>
  );
};

export default App;
