"use client";
import React from "react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
const Taskbar = ({ children }) => {
  const { profileActive, setProfileActive } = useContext(ProfileWindowContext);
  return (
    <div className={styles.taskbar}>
      <button
        className={styles.startButton}
        onClick={() => {
          setProfileActive(!profileActive);
        }}
      ></button>
      <div className={styles.tabs}>
        <Tab title="How to migrate to Linux" />
        <Tab title="How to migrate to Linux" />
        <Tab title="How to migrate to Linux" />
        <Tab title="How to migrate to Linux" />
        <Tab title="How to migrate to Linux" />

        {children}
      </div>
    </div>
  );
};

const Tab = ({ title }) => {
  return (
    <button className={styles.tab}>
      <img src="/imgs/chat_icon.png" className={styles.tabIcon} />
      <p className={styles.tabTitle}>{title}</p>
    </button>
  );
};

export default Taskbar;
