"use client";
import React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { testAccessToken, refreshToken } from "@/utils/APIHandler";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [verifying, setVerifying] = useState(true);
  const router = useRouter();

  const verifyTokens = async () => {
    setVerifying(true);
    const token = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    let isValid = false;
    const refreshAccess = async () => {
      if (!isValid) {
        let newAccess = await refreshToken(refresh);
        if (newAccess == null) {
          router.replace("/login/");
        } else {
          localStorage.setItem("access", newAccess.access);
          localStorage.setItem("refresh", newAccess.refresh);
        }
      }
    };
    if (!refresh) {
      router.replace("/login");
    } else {
      if (token) {
        isValid = testAccessToken(token);
      }
      if (!isValid) await refreshAccess();
    }
    setVerifying(false);
  };

  return (
    <AuthContext.Provider value={{ verifying, verifyTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
