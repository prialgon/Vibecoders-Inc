"use client";
import React from "react";
import { Suspense } from "react";
import styles from "./styles.module.css";
import { use, useState, useMemo, useEffect, useContext } from "react";
import { get, del } from "@/utils/APIHandler";
import { useRouter } from "next/navigation";
import { TaskbarContext } from "@/context/TaskbarContext";

const ChatList = () => {
  const [numPage, setNumPage] = useState(1);
  const [chats, setChats] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [numDeleted, setNumDeleted] = useState(0);

  useEffect(() => {
    setLoading(true);
    get(`api/chats/`, { page: numPage })
      .then((res) => {
        setChats(res.results);
        setIsNext(!!res.next);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [numPage, numDeleted]);

  return (
    <div className={styles.sectionLayout}>
      <div className={styles.chatList}>
        <h3 className={styles.chatTitle}>Chats</h3>
        {loading
          ? "Loading chats..."
          : chats.map((entry) => (
              <ChatEntry
                key={entry["id"]}
                title={entry["title"]}
                id={entry["id"]}
                setNumDeleted={setNumDeleted}
                numDeleted={numDeleted}
              />
            ))}
      </div>
      <div className={styles.buttons}>
        <input
          type="image"
          src="/imgs/left_arrow.png"
          onClick={() => setNumPage(numPage - 1)}
          className={styles.prevNextButton}
          disabled={numPage === 1}
        />
        <p>{numPage}</p>
        <input
          type="image"
          src="/imgs/right_arrow.png"
          onClick={() => setNumPage(numPage + 1)}
          className={styles.prevNextButton}
          disabled={!isNext | loading}
        />
      </div>
    </div>
  );
};

export default ChatList;

const ChatEntry = ({ title, id, numDeleted, setNumDeleted }) => {
  const router = useRouter();
  const { openChats, setOpenChats } = useContext(TaskbarContext);
  const handleDelete = async () => {
    del(`api/chats/${id}/`);
    setNumDeleted(numDeleted + 1);
    setOpenChats(openChats.filter((c) => c.id !== id));
  };

  const handleOpen = () => {
    if (!openChats.some((chat) => chat.id === id)) {
      setOpenChats([...openChats, { id: id, title: title }]);
    }
    router.push(`/chats/${id}`);
  };

  return (
    <div className={styles.entryAndButton}>
      <button className={styles.chatEntry} onClick={handleOpen}>
        <img src="/imgs/chat_icon.png" className={styles.entryIcon} />
        <p className={styles.entryTitle}>{title}</p>
      </button>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <img src="/imgs/Delete.png" className={styles.deleteIcon} />
      </button>
    </div>
  );
};
