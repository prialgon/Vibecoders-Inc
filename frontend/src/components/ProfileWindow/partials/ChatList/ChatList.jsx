"use client";
import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";

const ChatList = () => {
  const [numPage, setNumPage] = useState(1);

  const entries = [
    "Welcome to VibeGPT, Alberto",
    "How to add Clippy to Windows",
    "Definition of React Hooks",
    "Hallo Welt, Die Kiwi",
    "Iran War news",
    "VibeGPT is the best AI service",
  ];
  return (
    <div className={styles.sectionLayout}>
      <div className={styles.chatList}>
        <h3 className={styles.chatTitle}>Chats</h3>
        {entries.slice((numPage - 1) * 5, numPage * 5).map((entry) => (
          <ChatEntry key={entry} title={entry} />
        ))}
      </div>
      <div className={styles.buttons}>
        <input
          type="image"
          src="/imgs/left_arrow.png"
          onClick={() => setNumPage(numPage - 1)}
          disabled={numPage === 1}
          className={styles.prevNextButton}
        />
        <p>{numPage}</p>
        <input
          type="image"
          src="/imgs/right_arrow.png"
          onClick={() => setNumPage(numPage + 1)}
          disabled={numPage === Math.floor(entries.length / 5) + 1}
          className={styles.prevNextButton}
        />
      </div>
    </div>
  );
};

export default ChatList;

const ChatEntry = ({ title }) => {
  return (
    <button className={styles.chatEntry}>
      <img src="/imgs/chat_icon.png" className={styles.entryIcon} />
      <p className={styles.entryTitle}>{title}</p>
    </button>
  );
};
