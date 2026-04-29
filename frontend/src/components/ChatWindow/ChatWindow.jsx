import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRef, useEffect, useContext } from "react";
import { get, post } from "@/utils/APIHandler";
import ChatMessage from "./partials/ChatMessage/ChatMessage";
import ChatMessageInput from "./partials/ChatMessageInput/ChatMessageInput";
import { useRouter } from "next/navigation";
import { TaskbarContext } from "@/context/TaskbarContext";

const ChatWindow = ({ id, title }) => {
  const bottomRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { openChats, setOpenChats } = useContext(TaskbarContext);

  useEffect(() => {
    if (!openChats.some((chat) => chat.id == id))
      setOpenChats([...openChats, { id: id, title: title }]);
    async function fetchChat() {
      const data = await get(`api/chats/${id}`);
      setMessages(data.messages);
    }

    if (id) fetchChat();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text) => {
    const msg = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, msg]);

    const response = await post(`api/chats/${id}/`, msg);

    if (!response) return;

    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className={styles.window}>
      <ChatWindowHeader title={title} id={id} />
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
          <ChatMessageInput handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

const ChatWindowHeader = ({ title, id }) => {
  const router = useRouter();
  const { openChats, setOpenChats } = useContext(TaskbarContext);
  return (
    <div className={styles.windowHeader}>
      <p className={styles.windowHeaderText}>{title}</p>
      <div className={styles.headerButtons}>
        <input
          type="image"
          src="/imgs/Minimize.png"
          className={styles.close}
          onClick={() => router.push("/home")}
        />
        <input
          type="image"
          src="/imgs/close.png"
          className={styles.close}
          onClick={() => {
            setOpenChats(openChats.filter((c) => c.id != id));
            router.push("/home");
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
