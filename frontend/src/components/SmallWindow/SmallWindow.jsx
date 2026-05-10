"use client";
import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
const SmallWindow = ({ title, children }) => {
  return (
    <div className={styles.window}>
      <SmallWindowHeader title={title} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const SmallWindowHeader = ({ title }) => {
  const router = useRouter();

  return (
    <div className={styles.windowHeader}>
      <p className={styles.windowHeaderText}>{title}</p>
      <input
        type="image"
        src="/imgs/close.png"
        className={styles.close}
        onClick={() => router.push("/home")}
      />
    </div>
  );
};

export default SmallWindow;
