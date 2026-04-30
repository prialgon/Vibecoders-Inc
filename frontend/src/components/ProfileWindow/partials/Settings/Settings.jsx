"use client";
import styles from "./styles.module.css";
import { post } from "@/utils/APIHandler";
import { useRouter } from "next/navigation";
import { DarthVaderContext } from "@/context/DarthVaderContext";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { useContext, useRef, useState } from "react";
import { TaskbarContext } from "@/context/TaskbarContext";
const Settings = () => {
  const router = useRouter();

  const { forceSide, changeSide } = useContext(DarthVaderContext);
  const { setProfileActive } = useContext(ProfileWindowContext);
  const [createChat, setCreateChat] = useState(false);
  const inputRef = useRef(null);
  const { openChats, setOpenChats } = useContext(TaskbarContext);

  const handleCreateChat = async (title) => {
    const response = await post("api/chats/", { title: title });
    setProfileActive(false);
    setCreateChat(false);
    if (!openChats.some((chat) => chat.id === response.id)) {
      setOpenChats([...openChats, { id: response.id, title: title }]);
    }
    router.push(`/chats/${response.id}`);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.createChatDiv}>
        <button
          className={styles.settingsEntry}
          onClick={() => setCreateChat(true)}
          type="button"
        >
          <img src="/imgs/Add.png" className={styles.entryIcon} />
          <p className={styles.settingsEntryTitle}>New Chat</p>
        </button>
        {createChat ? (
          <div className={styles.inputDiv}>
            <input
              className={styles.createChatInput}
              placeholder="Enter chat name..."
              ref={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateChat(inputRef.current.value);
                }
              }}
            ></input>
            <button
              className={styles.confirmNameButton}
              onClick={() => handleCreateChat(inputRef.current.value)}
            >
              <img src="/imgs/Save.png" className={styles.createChatIcon} />
            </button>
            <button
              className={styles.cancelNameButton}
              onClick={() => setCreateChat(false)}
              type="button"
            >
              <img src="/imgs/Undo.png" className={styles.createChatIcon} />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <button className={styles.settingsEntry}>
        <img src="/imgs/tokens.png" className={styles.entryIcon} />
        <p className={styles.settingsEntryTitle}>Buy More Tokens</p>
      </button>
      <button className={styles.settingsEntry}>
        <img src="/imgs/Search.png" className={styles.entryIcon} />
        <p className={styles.settingsEntryTitle}>Search Chats</p>
      </button>
      <button className={styles.settingsEntry} onClick={changeSide}>
        <img src="/imgs/darkmode.png" className={styles.entryIcon} />
        <p className={styles.settingsEntryTitle}>Toggle Dark Mode</p>
      </button>

      <button className={styles.settingsEntry}>
        <img src="/imgs/admin_panel.png" className={styles.entryIcon} />
        <p className={styles.settingsEntryTitle}>Admin Panel</p>
      </button>
      <button
        className={styles.settingsEntry}
        onClick={() => {
          setProfileActive(false);
          router.push("/settings");
        }}
      >
        <img src="/imgs/users.png" className={styles.entryIcon} />
        <p className={styles.settingsEntryTitle}>User Settings</p>
      </button>
    </div>
  );
};

export default Settings;
