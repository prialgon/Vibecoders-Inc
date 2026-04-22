import React from "react";
import styles from "./styles.module.css";

const Taskbar = ({ children }) => {
  return (
    <div className={styles.taskbar}>
      <button className={styles.startButton}>Start</button>
      <Tab title="How to migrate to Linux" />

      <Tab title="How to migrate to Linux" />

      <Tab title="How to migrate to Linux" />
      <Tab title="How to migrate to Linux" />
      <Tab title="How to migrate to Linux" />
      <Tab title="How to migrate to Linux" />
      {children}
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
