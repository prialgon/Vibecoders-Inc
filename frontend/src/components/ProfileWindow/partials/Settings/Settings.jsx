"use client";
import styles from "./styles.module.css";
import { post } from "@/utils/APIHandler";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const Settings = () => {
  const router = useRouter();
  const [createChat, setCreateChat] = useState(false);
  const inputRef = useRef(null);

  const handleCreateChat = async (title) => {
    const response = await post("api/chats/", { title: title });
    router.push(`/chats/${response.id}`);
    setCreateChat(false);
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
          New Chat
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
        Buy More Tokens
      </button>
      <button className={styles.settingsEntry}>
        <img src="/imgs/Search.png" className={styles.entryIcon} />
        Search Chats
      </button>
      <button className={styles.settingsEntry}>
        <img src="/imgs/darkmode.png" className={styles.entryIcon} />
        Toggle Dark Mode
      </button>

      <button className={styles.settingsEntry}>
        <img src="/imgs/admin_panel.png" className={styles.entryIcon} />
        Admin Panel
      </button>
      <button
        className={styles.settingsEntry}
        onClick={() => router.push("/settings")}
      >
        <img src="/imgs/users.png" className={styles.entryIcon} />
        User Settings
      </button>
    </div>
  );
};

export default Settings;
