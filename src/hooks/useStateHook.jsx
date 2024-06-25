import { useState } from "react";

function UseStateHook() {
  const [state, setState] = useState(1);

  // setState(state + 1); // Uncaught Error: Too many re-renders.
  // // React limits the number of renders to prevent an infinite loop.

  return (
    <>
      <h1>useStateHook : </h1>
      <div>{state}</div>
    </>
  );
}

export default UseStateHook;
