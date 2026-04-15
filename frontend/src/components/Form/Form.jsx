import React from "react";
import styles from "./styles.module.css";

const Form = ({ title, id, children, buttonText, extra, errorId }) => {
  return (
    <form id={id} className={styles.form}>
      <h2>{title}</h2>
      <div className={styles.formChildren}>{children}</div>
      <p id={errorId} style={styles.error}/>
      <button type="submit" form={id} className={styles.formButton}>{buttonText}</button>
      {extra && <div className={styles.extra}>{extra}</div>}
    </form>
  );
};

export default Form;
