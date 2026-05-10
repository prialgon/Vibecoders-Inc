import React, { useState } from "react";
import { createContext } from "react";

export const ChatTitleContext = createContext(null);

export const ChatTitleProvider = ({ children }) => {
  const [title, setTitle] = useState("Loading...");
  return (
    <ChatTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </ChatTitleContext.Provider>
  );
};
