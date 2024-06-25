import { useState } from "react";
import CompC from "./CompC";
import CompD from "./CompD";

function CompB() {
  return (
    <>
      <h1>component B</h1>
      <CompC />
      <CompD />
    </>
  );
}

export default CompB;
