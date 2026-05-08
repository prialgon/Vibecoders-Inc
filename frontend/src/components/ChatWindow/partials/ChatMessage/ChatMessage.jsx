import React from "react";
import styles from "./styles.module.css";

const ChatMessage = ({ user, message, loading = false }) => {
  return (
    <div
      className={`${styles.messageRow} ${user ? styles.rightMessageContainer : styles.leftMessageContainer}`}
    >
      <div
        className={`${styles.messageContainer} ${user ? styles.rightMessage : styles.leftMessage}`}
      >
        {loading ? (
          <div className={styles.loadingWrap}>
            <img src="/imgs/clippy.webp" className={styles.clippy} alt="Clippy" />
            <div className={styles.loadingDots} aria-label="Loading response">
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        ) : (
          <p className={styles.message}>{message}</p>
        )}
      </div>
    </div>
  );
};
export default ChatMessage;
