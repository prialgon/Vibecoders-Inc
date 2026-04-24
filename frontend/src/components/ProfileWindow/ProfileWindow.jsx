import React from "react";
import styles from "./styles.module.css";
import ChatList from "./partials/ChatList/ChatList";
import Settings from "./partials/Settings/Settings";
const ProfileWindow = () => {
  return (
    <div className={styles.mainWindow}>
      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <img src="/imgs/clippy.webp" className={styles.userIcon} />
          <p>
            <strong>Alberto Prieto</strong>
          </p>
        </div>
        <div>
          <p>Credits used: 75%</p>
        </div>
      </div>
      <div className={styles.userContent}>
        <ChatList />
        <Settings />
      </div>
      <div className={styles.footer}>
        <button className={styles.logOutButton}>
          <img src="/imgs/Power.png" className={styles.logOutIcon} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileWindow;
