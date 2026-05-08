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
  const [error, setError] = useState(false);
  const { title, setTitle } = useContext(ChatTitleContext);

  useEffect(() => {
    setLoading(true);
    setError(false);
    get(`api/chats/`, { page: numPage })
      .then((res) => {
        if (res?.ok === false || !res?.results) {
          setError(true);
          setChats([]);
          setIsNext(false);
          return;
        }
        setChats(res.results);
        setIsNext(!!res.next);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setChats([]);
        setIsNext(false);
      })
      .finally(() => setLoading(false));
  }, [numPage, numDeleted, rename]);

  return (
    <div className={styles.sectionLayout}>
      <div className={styles.chatList}>
        <h3 className={styles.chatTitle}>Chats</h3>
        {error ? <p className={styles.errorBox}>error fetching data</p> : null}
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
                setError={setError}
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
  setError,
}) => {
  const router = useRouter();
  const { openChats, setOpenChats } = useContext(TaskbarContext);
  const { setProfileActive } = useContext(ProfileWindowContext);

  const inputRef = useRef(null);

  const handleDelete = async () => {
    let response;
    try {
      response = await del(`/api/chats/${id}/`);
    } catch (err) {
      console.error(err);
      setError(true);
      return;
    }
    if (response?.ok === false) {
      setError(true);
      return;
    }
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
    let response;
    try {
      response = await patch(`/api/chats/${id}/`, { title: newTitle });
    } catch (err) {
      console.error(err);
      setError(true);
      return;
    }
    if (response?.ok === false) {
      setError(true);
      return;
    }
    setContextTitle(newTitle);
    setRename(null);
    if (openChats.some((chat) => chat.id == id)) {
      setOpenChats([
        ...openChats.filter((chat) => chat.id != id),
        { id: id, title: newTitle },
      ]);
    }
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
