"use client";
import React from "react";
import { createContext, useState, useContext } from "react";

export const TaskbarContext = createContext(null);

export const TaskbarContextProvider = ({ children }) => {
  const [openChats, setOpenChats] = useState([]);

  return (
    <TaskbarContext.Provider value={{ openChats, setOpenChats }}>
      {children}
    </TaskbarContext.Provider>
  );
};
