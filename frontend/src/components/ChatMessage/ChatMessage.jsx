import React from "react";
import styles from "./styles.module.css";

const ChatMessage = ({ message }) => {
  return (
    <div className={styles.messageContainer}>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
export default ChatMessage;
