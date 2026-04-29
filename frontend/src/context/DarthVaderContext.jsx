import React from "react";
import { createContext, useState, useEffect } from "react";

export const DarthVaderContext = createContext(null);

export const DarthVaderContextProvider = ({ children }) => {
  const [forceSide, setForceSide] = useState("jedi");

  useEffect(() => {
    const savedSide = localStorage.getItem("forceSide") || "jedi";
    setForceSide(savedSide);
    document.documentElement.dataset.theme = savedSide;
  }, []);

  const changeSide = () => {
    const newSide = forceSide === "jedi" ? "sith" : "jedi";
    setForceSide(newSide);
    localStorage.setItem("forceSide", newSide);
    document.documentElement.dataset.theme = newSide;
  };

  return (
    <DarthVaderContext.Provider value={{ forceSide, changeSide }}>
      {children}
    </DarthVaderContext.Provider>
  );
};
