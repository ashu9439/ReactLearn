import { useEffect, useState } from "react";

function UseEffectHook() {
  const [state, setState] = useState(1);
  const [dependency, setDependency] = useState(1);
  useEffect(() => {
    console.log(
      "this function runs on every render => on initial load and every state/ prop change",
    );
  });

  useEffect(() => {
    console.log(
      "this function runs only on any of the dependency change => on initial load and on any changes to the variables present in the dependency array",
    );
  }, [dependency]);

  useEffect(() => {
    console.log(
      "this function runs only on initial render => on initial load and on refresh ",
    );
  }, []);

  useEffect(() => {
    return () => {
      console.log(
        "this function runs only on unmounting  => on component unmount and on refresh ",
      );
    };
  });

  //--------------------handlers
  const handleClick = () => {
    setState(state + 1);
  };
  const handleChange = (event) => {
    setDependency(event.target.value);
  };

  //-----------------------render
  return (
    <>
      <h1>UseEffect : </h1>
      <div>state = {state}</div>
      <button onClick={handleClick}>increase state</button>

      <div>dependency = {dependency}</div>
      <input type="text" value={dependency} onChange={handleChange} />
    </>
  );
}

export default UseEffectHook;
