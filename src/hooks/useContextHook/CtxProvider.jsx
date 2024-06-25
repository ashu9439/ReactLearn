import React, { createContext, useState } from 'react';

// Create a context with a default value
const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState("Hello, World!");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;