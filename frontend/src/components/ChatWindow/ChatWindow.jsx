import React from "react";
import styles from "./styles.module.css";

const ChatWindow = ({ title, children }) => {
  return (
    <div className={styles.window}>
      <ChatWindowHeader title={title} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const ChatWindowHeader = ({ title }) => {
  return (
    <div className={styles.windowHeader}>
      <p className={styles.windowHeaderText}>{title}</p>
      <img src="/imgs/close.png" className={styles.close} />
    </div>
  );
};

export default ChatWindow;
