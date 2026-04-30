"use client";
import React from "react";
import { Suspense } from "react";
import styles from "./styles.module.css";
import { use, useState, useMemo, useEffect, useContext, useRef } from "react";
import { get, del, patch } from "@/utils/APIHandler";
import { useRouter } from "next/navigation";
import { TaskbarContext } from "@/context/TaskbarContext";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { ChatTitleContext } from "@/context/ChatTitleContext";

const ChatList = () => {
  const [numPage, setNumPage] = useState(1);
  const [chats, setChats] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [loading, setLoading] = useState(true);
  const [numDeleted, setNumDeleted] = useState(0);
  const [rename, setRename] = useState(null);
  const { title, setTitle } = useContext(ChatTitleContext);

  useEffect(() => {
    setLoading(true);
    get(`api/chats/`, { page: numPage })
      .then((res) => {
        setChats(res.results);
        setIsNext(!!res.next);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [numPage, numDeleted, rename]);

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
                rename={rename === entry["id"]}
                setRename={setRename}
                setContextTitle={setTitle}
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

const ChatEntry = ({
  title,
  id,
  numDeleted,
  setNumDeleted,
  rename,
  setRename,
  setContextTitle,
}) => {
  const router = useRouter();
  const { openChats, setOpenChats } = useContext(TaskbarContext);
  const { setProfileActive } = useContext(ProfileWindowContext);

  const inputRef = useRef(null);

  const handleDelete = async () => {
    del(`/api/chats/${id}/`);
    setNumDeleted(numDeleted + 1);
    setOpenChats(openChats.filter((c) => c.id !== id));
  };

  const handleOpen = () => {
    if (!openChats.some((chat) => chat.id === id)) {
      setOpenChats([...openChats, { id: id, title: title }]);
    }
    setProfileActive(false);
    router.push(`/chats/${id}`);
  };

  const handleRename = async (newTitle) => {
    await patch(`/api/chats/${id}/`, { title: newTitle });
    setContextTitle(newTitle);
    setRename(null);
  };

  const divLoader = () => {
    if (!rename) {
      return (
        <>
          <button className={styles.chatEntry} onClick={handleOpen}>
            <img src="/imgs/chat_icon.png" className={styles.entryIcon} />
            <p className={styles.entryTitle}>{title}</p>
          </button>
          <button className={styles.renameButton} onClick={() => setRename(id)}>
            <img src="/imgs/Rename.png" className={styles.renameIcon} />
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <img src="/imgs/Delete.png" className={styles.deleteIcon} />
          </button>
        </>
      );
    } else {
      return (
        <>
          <div className={styles.renameActiveButton}>
            <img src="/imgs/chat_icon.png" className={styles.entryIcon} />
            <input
              className={styles.renameInput}
              defaultValue={title}
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename(inputRef.current.value);
                }
              }}
            ></input>
          </div>
          <button
            className={styles.renameButton}
            onClick={() =>
              inputRef.current && handleRename(inputRef.current.value)
            }
          >
            <img src="/imgs/Save.png" className={styles.renameIcon} />
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => setRename(null)}
          >
            <img src="/imgs/Undo.png" className={styles.deleteIcon} />
          </button>
        </>
      );
    }
  };

  return <div className={styles.entryAndButton}>{divLoader()}</div>;
};
