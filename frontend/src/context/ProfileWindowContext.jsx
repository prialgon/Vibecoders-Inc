"use client";

import { createContext, useContext, useState } from "react";

export const ProfileWindowContext = createContext(false);

export const ProfileProvider = ({ children }) => {
  const [profileActive, setProfileActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <ProfileWindowContext.Provider
      value={{ profileActive, setProfileActive, searchActive, setSearchActive }}
    >
      {children}
    </ProfileWindowContext.Provider>
  );
};
