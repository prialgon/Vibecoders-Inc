"use client";
import React from "react";
import styles from "./styles.module.css";
import Header from "./partials/Header/Header";
import Footer from "./partials/Footer/Footer";
import Taskbar from "@/components/Taskbar/Taskbar";
import { useContext, useState, createContext, useEffect } from "react";
import {
  ProfileProvider,
  ProfileWindowContext,
} from "@/context/ProfileWindowContext";
import { ChatTitleProvider } from "@/context/ChatTitleContext";
import {
  TaskbarContext,
  TaskbarContextProvider,
} from "@/context/TaskbarContext";
import { DarthVaderContextProvider } from "@/context/DarthVaderContext";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
import { usePathname, useRouter } from "next/navigation";
import { testAccessToken, refreshToken } from "@/utils/APIHandler";
import { AuthContext } from "@/context/AuthContext";

const BaseTemplate = ({ children }) => {
  return (
    <DarthVaderContextProvider>
      <ProfileProvider>
        <ChatTitleProvider>
          <TaskbarContextProvider>
            <BaseTemplateContent>{children}</BaseTemplateContent>
          </TaskbarContextProvider>
        </ChatTitleProvider>
      </ProfileProvider>
    </DarthVaderContextProvider>
  );
};

const BaseTemplateContent = ({ children }) => {
  const { profileActive } = useContext(ProfileWindowContext);
  const { verifying, verifyTokens } = useContext(AuthContext);
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/" || pathname === "/login" || pathname === "/register";
  useEffect(() => {
    if (!isAuthPage) {
      verifyTokens();
    }
  }, [isAuthPage]);
  return (
    <div className={styles.layout}>
      {!isAuthPage && <Header />}
      <div className={styles.content}>
        {children}
        {!isAuthPage && profileActive ? <ProfileWindow /> : null}
      </div>
      {!isAuthPage && <Taskbar />}
    </div>
  );
};

export default BaseTemplate;
