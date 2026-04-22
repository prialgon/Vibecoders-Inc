import React from "react";
import styles from "./styles.module.css";
import Header from "./partials/Header/Header";
import Footer from "./partials/Footer/Footer";
import Taskbar from "@/components/Taskbar/Taskbar";

const BaseTemplate = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Taskbar />
    </div>
  );
};

export default BaseTemplate;
