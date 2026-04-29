"use client";
import React from "react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { TaskbarContext } from "@/context/TaskbarContext";
import { useRouter } from "next/navigation";
const Taskbar = ({ children }) => {
  const { profileActive, setProfileActive } = useContext(ProfileWindowContext);
  const { openChats, setOpenChats } = useContext(TaskbarContext);
  return (
    <div className={styles.taskbar}>
      <button
        className={styles.startButton}
        onClick={() => {
          setProfileActive(!profileActive);
        }}
      ></button>
      <div className={styles.tabs}>
        {openChats.map((chat) => (
          <Tab title={chat.title} key={chat.id} id={chat.id} />
        ))}
        {children}
      </div>
    </div>
  );
};

const Tab = ({ title, id }) => {
  const router = useRouter();
  return (
    <button className={styles.tab} onClick={() => router.push(`/chats/${id}`)}>
      <img src="/imgs/chat_icon.png" className={styles.tabIcon} />
      <p className={styles.tabTitle}>{title}</p>
    </button>
  );
};

export default Taskbar;
