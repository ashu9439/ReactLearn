import { useContext, useState } from "react";
import MyContext from "./CtxProvider";

function CompC() {
  const { value, setValue } = useContext(MyContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <h1>component C</h1>
      <input type="text" value={value} onChange={handleChange} />
      <p>CompC Value: {value}</p>
    </>
  );
}

export default CompC;
