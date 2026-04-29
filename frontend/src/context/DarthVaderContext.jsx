import React from "react";
import { createContext, useState, useEffect } from "react";

export const DarthVaderContext = createContext(null);

export const DarthVaderContextProvider = ({ children }) => {
  const [isAnakin, setIsAnakin] = useState(true);

  useEffect(() => {
    const savedSide = localStorage.getItem("isAnakin") || true;
    setIsAnakin(savedSide);
    document.documentElement.dataset.theme = savedSide;
  }, []);

  const changeSide = () => {
    const newSide = !isAnakin;
    setIsAnakin(newSide);
    localStorage.setItem("isAnakin", newSide);
    document.documentElement.dataset.theme = newSide;
  };

  return (
    <DarthVaderContext.Provider value={{ isAnakin, changeSide }}>
      {children}
    </DarthVaderContext.Provider>
  );
};
