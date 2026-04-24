"use client";

import { createContext, useContext, useState } from "react";

export const ProfileWindowContext = createContext(false);

export const ProfileProvider = ({ children }) => {
  const [profileActive, setProfileActive] = useState(true);

  return (
    <ProfileWindowContext.Provider value={{ profileActive, setProfileActive }}>
      {children}
    </ProfileWindowContext.Provider>
  );
};
