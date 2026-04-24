import React from "react";
import styles from "./styles.module.css";
import { useRef, useEffect } from "react";

const ChatWindow = ({ title, children }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  return (
    <div className={styles.window}>
      <ChatWindowHeader title={title} />
      <div className={styles.content}>
        {children}
        <div ref={bottomRef} />
      </div>
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
