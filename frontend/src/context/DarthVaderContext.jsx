import React from "react";
import { createContext, useState, useEffect } from "react";

export const DarthVaderContext = createContext(null);

export const DarthVaderContextProvider = ({ children }) => {
  const [forceSide, setForceSide] = useState("jedi");

  useEffect(() => {
    const isAnakin = localStorage.getItem("isAnakin") || true;
    const savedSide = isAnakin ? "jedi" : "sith";
    setForceSide(savedSide);
    document.documentElement.dataset.theme = savedSide;
  }, []);

  const changeSide = () => {
    const newSide = forceSide === "jedi" ? "sith" : "jedi";
    setForceSide(newSide);
    localStorage.setItem("isAnakin", newSide === "jedi");
    document.documentElement.dataset.theme = newSide;
  };

  return (
    <DarthVaderContext.Provider value={{ forceSide, changeSide }}>
      {children}
    </DarthVaderContext.Provider>
  );
};
