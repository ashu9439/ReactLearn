import { useState } from "react";
import CompB from "./CompB";
import { MyProvider } from "./CtxProvider";

function CompA() {
  return (
    <>
      <h1> useContextHook </h1>
      <MyProvider>
        <CompB />
      </MyProvider>
    </>
  );
}

export default CompA;
