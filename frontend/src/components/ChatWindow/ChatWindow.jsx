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
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);

  useEffect(() => {
    async function fetchChat() {
      try {
        const data = await get(`api/chats/${id}`);
        if (data?.ok === false || !data?.messages) {
          setError(true);
          setMessages([]);
          return;
        }
        setError(false);
        setMessages(data.messages);
      } catch (err) {
        console.error(err);
        setError(true);
        setMessages([]);
      }
    }

    if (id) fetchChat();
  }, [id]);

  useEffect(() => {
    if (!hidden) {
      if (!openChats.some((chat) => chat.id == id))
        setOpenChats([...openChats, { id: id, title: title }]);
      if (openChats.some((chat) => chat.id == id && chat.title != title)) {
        if (title != "Loading...") {
          setOpenChats([
            ...openChats.filter((c) => c.id != id),
            { id: id, title: title },
          ]);
        }
      }
    }
  }, [id, title, setOpenChats, hidden]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (text) => {
    const msg = {
      role: "user",
      content: text,
    };

    setError(false);
    setMessages((prev) => [...prev, msg]);
    setLoadingReply(true);

    let response;
    try {
      response = await post(`/api/chats/${id}/`, msg);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoadingReply(false);
      return;
    }

    if (!response || response?.ok === false || !response.role) {
      setError(true);
      setLoadingReply(false);
      return;
    }
    setError(false);
    setLoadingReply(false);
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className={styles.window}>
      <ChatWindowHeader title={title} id={id} setHidden={setHidden} />
      <div className={styles.content}>
        <div className={styles.messages}>
          {error ? (
            <p className={styles.errorBox}>error fetching data</p>
          ) : null}
          {messages.map((msg, id) => (
            <ChatMessage
              key={id}
              user={msg.role === "user"}
              message={msg.content}
            />
          ))}
          {loadingReply ? <ChatMessage user={false} loading={true} /> : null}
          <div ref={bottomRef} />
        </div>
        <div className={styles.inputArea}>
          <ChatMessageInput handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

const ChatWindowHeader = ({ title, id, setHidden }) => {
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
            setHidden(true);
            setOpenChats(openChats.filter((c) => c.id != id));
            router.push("/home");
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
