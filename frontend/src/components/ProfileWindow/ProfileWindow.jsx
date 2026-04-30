import React from "react";
import styles from "./styles.module.css";
import ChatList from "./partials/ChatList/ChatList";
import Settings from "./partials/Settings/Settings";
import { useRouter } from "next/navigation";
import { get } from "@/utils/APIHandler.js";
import { Suspense } from "react";
import { TaskbarContext } from "@/context/TaskbarContext";
import { useContext } from "react";
import { DarthVaderContext } from "@/context/DarthVaderContext";
const ProfileWindow = () => {
  const router = useRouter();
  const { setOpenChats } = useContext(TaskbarContext);
  const handleLogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setOpenChats([]);
    router.push("/login");
  };

  return (
    <div className={styles.mainWindow}>
      <div className={styles.userProfile}>
        <div className={styles.userInfo}>
          <img src="/imgs/clippy.webp" className={styles.userIcon} />
          <h2>
            <Suspense fallback="Loading...">
              {get("/api/users/profile", null).then((res) => res["username"])}
            </Suspense>{" "}
          </h2>
        </div>
        <div className={styles.rightText}>
          <Suspense fallback="...">
            {get("/api/usage/", null)
              .then((res) => res.results)
              .then((result) => {
                const fecha = new Date(result[0].reset_date);
                return (
                  <>
                    <p>
                      Available Messages:{" "}
                      {result[0].messages_limit - result[0].messages_used}
                    </p>
                    <p>Reset date: {fecha.toLocaleString()}</p>
                  </>
                );
              })}
          </Suspense>
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
