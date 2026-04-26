import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRef, useEffect } from "react";
import { get } from "@/utils/APIHandler";
import ChatMessage from "./partials/ChatMessage/ChatMessage";
import ChatMessageInput from "./partials/ChatMessageInput/ChatMessageInput";

const ChatWindow = ({ id, title }) => {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchChat() {
      const data = await get(`api/chats/${id}`);
      setMessages(data.messages);
    }

    if (id) fetchChat();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.window}>
      <ChatWindowHeader title={title} />
      <div className={styles.content}>
        <div className={styles.messages}>
          {messages.map((msg, id) => (
            <ChatMessage
              key={id}
              user={msg.role === "user"}
              message={msg.content}
            />
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={styles.inputArea}>
          <ChatMessageInput />
        </div>
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
