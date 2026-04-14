import React from "react";
import styles from "./styles.module.css";

const SmallWindow = ({ title, children }) => {
  return (
    <div className={styles.window}>
      <SmallWindowHeader title={title} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const SmallWindowHeader = ({ title }) => {
  return (
    <div className={styles.windowHeader}>
      <p className={styles.windowHeaderText}>{title}</p>
      <img src="/imgs/close.png" className={styles.close} />
    </div>
  );
};

export default SmallWindow;
