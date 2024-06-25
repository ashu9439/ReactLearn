import { useContext, useState } from "react";
import MyContext from "./CtxProvider";

function CompD() {
  const { value, setValue } = useContext(MyContext);

  return (
    <>
      <h1>component D</h1>
      <p>CompD Value: {value}</p>
    </>
  );
}

export default CompD;
