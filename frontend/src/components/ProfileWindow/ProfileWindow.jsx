import React from "react";
import styles from "./styles.module.css";
import ChatList from "./partials/ChatList/ChatList";
import Settings from "./partials/Settings/Settings";
import { useRouter } from "next/navigation";

const ProfileWindow = () => {
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.push("/login");
  };
  return (
    <div className={styles.mainWindow}>
      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <img src="/imgs/clippy.webp" className={styles.userIcon} />
          <h2>Alberto Prieto</h2>
        </div>
        <div>
          <p>Available Messages: 312</p>
        </div>
      </div>
      <div className={styles.userContent}>
        <ChatList />
        <Settings />
      </div>
      <div className={styles.footer}>
        <button className={styles.logOutButton} onClick={handleLogOut}>
          <img src="/imgs/Power.png" className={styles.logOutIcon} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileWindow;
