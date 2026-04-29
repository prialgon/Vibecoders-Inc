"use client";
import styles from "./styles.module.css";
import { post } from "@/utils/APIHandler";
import { useRouter } from "next/navigation";
import { DarthVaderContext } from "@/context/DarthVaderContext";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { useContext } from "react";
const Settings = () => {
  const router = useRouter();

  const { forceSide, changeSide } = useContext(DarthVaderContext);
  const { setProfileActive } = useContext(ProfileWindowContext);

  const handleCreateChat = async () => {
    const response = await post("api/chats/", { title: "hello" });
    setProfileActive(false);
    router.push(`/chats/${response.id}`);
  };

  return (
    <div className={styles.settings}>
      <button
        className={styles.settingsEntry}
        onClick={handleCreateChat}
        type="button"
      >
        <img src="/imgs/Add.png" className={styles.entryIcon} />
        New Chat
      </button>
      <button className={styles.settingsEntry}>
        <img src="/imgs/tokens.png" className={styles.entryIcon} />
        Buy More Tokens
      </button>
      <button className={styles.settingsEntry}>
        <img src="/imgs/Search.png" className={styles.entryIcon} />
        Search Chats
      </button>
      <button className={styles.settingsEntry} onClick={changeSide}>
        <img src="/imgs/darkmode.png" className={styles.entryIcon} />
        Toggle Dark Mode
      </button>

      <button className={styles.settingsEntry}>
        <img src="/imgs/admin_panel.png" className={styles.entryIcon} />
        Admin Panel
      </button>
      <button
        className={styles.settingsEntry}
        onClick={() => {
          setProfileActive(false);
          router.push("/settings");
        }}
      >
        <img src="/imgs/users.png" className={styles.entryIcon} />
        User Settings
      </button>
    </div>
  );
};

export default Settings;
