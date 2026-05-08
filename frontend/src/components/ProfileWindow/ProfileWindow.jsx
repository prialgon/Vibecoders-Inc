import React from "react";
import styles from "./styles.module.css";
import ChatList from "./partials/ChatList/ChatList";
import Settings from "./partials/Settings/Settings";
import { useRouter } from "next/navigation";
import { get } from "@/utils/APIHandler.js";
import { TaskbarContext } from "@/context/TaskbarContext";
import { useContext, useEffect, useState } from "react";
import { DarthVaderContext } from "@/context/DarthVaderContext";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
const ProfileWindow = () => {
  const router = useRouter();
  const { setOpenChats } = useContext(TaskbarContext);
  const { setProfileActive } = useContext(ProfileWindowContext);
  const [username, setUsername] = useState("Loading...");
  const [usage, setUsage] = useState(null);
  const [profileError, setProfileError] = useState(false);
  const [usageError, setUsageError] = useState(false);

  useEffect(() => {
    get("/api/users/profile", null)
      .then((res) => {
        if (res?.ok === false || !res?.username) {
          setProfileError(true);
          return;
        }
        setProfileError(false);
        setUsername(res["username"]);
      })
      .catch((err) => {
        console.error(err);
        setProfileError(true);
      });

    get("/api/usage/", null)
      .then((res) => {
        if (res?.ok === false || !res?.results?.[0]) {
          setUsageError(true);
          return;
        }
        setUsageError(false);
        setUsage(res.results[0]);
      })
      .catch((err) => {
        console.error(err);
        setUsageError(true);
      });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setOpenChats([]);
    setProfileActive(false);
    router.push("/login");
  };

  return (
    <div className={styles.mainWindow}>
      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <img src="/imgs/clippy.webp" className={styles.userIcon} />
          {profileError ? (
            <p className={styles.errorBox}>error fetching data</p>
          ) : (
            <h2>{username}</h2>
          )}
        </div>
        <div className={styles.rightText}>
          {usageError ? (
            <p className={styles.errorBox}>error fetching data</p>
          ) : usage ? (
            <>
              <p>Available Messages: {usage.messages_limit - usage.messages_used}</p>
              <p>Reset date: {new Date(usage.reset_date).toLocaleString()}</p>
            </>
          ) : (
            "..."
          )}
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
