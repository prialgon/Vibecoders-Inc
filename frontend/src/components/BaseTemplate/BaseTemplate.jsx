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
const BaseTemplate = ({ children }) => {
  return (
    <ProfileProvider>
      {" "}
      <div className={styles.layout}>
        <Header />
        <div className={styles.content}>{children}</div>
        <Taskbar />
      </div>
    </ProfileProvider>
  );
};

export default BaseTemplate;
