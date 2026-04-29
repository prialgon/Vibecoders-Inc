"use client";
import React from "react";
import styles from "./styles.module.css";
import Header from "./partials/Header/Header";
import Footer from "./partials/Footer/Footer";
import Taskbar from "@/components/Taskbar/Taskbar";
import { useContext, useState, createContext } from "react";
import {
  ProfileProvider,
  ProfileWindowContext,
} from "@/context/ProfileWindowContext";
import { AuthProvider } from "@/context/AuthContext";
import {
  TaskbarContext,
  TaskbarContextProvider,
} from "@/context/TaskbarContext";
import { DarthVaderContextProvider } from "@/context/DarthVaderContext";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
import { usePathname } from "next/navigation";

const BaseTemplate = ({ children }) => {
  return (
    <DarthVaderContextProvider>
      <ProfileProvider>
        <TaskbarContextProvider>
          <BaseTemplateContent>{children}</BaseTemplateContent>
        </TaskbarContextProvider>
      </ProfileProvider>
    </DarthVaderContextProvider>
  );
};

const BaseTemplateContent = ({ children }) => {
  const { profileActive } = useContext(ProfileWindowContext);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

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
