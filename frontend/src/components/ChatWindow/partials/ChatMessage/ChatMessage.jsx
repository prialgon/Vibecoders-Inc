import React from "react";
import styles from "./styles.module.css";

const ChatMessage = ({ user, message }) => {
  return (
    <div
      className={`${styles.messageRow} ${user ? styles.rightMessageContainer : styles.leftMessageContainer}`}
    >
      <div
        className={`${styles.messageContainer} ${user ? styles.rightMessage : styles.leftMessage}`}
      >
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};
export default ChatMessage;
