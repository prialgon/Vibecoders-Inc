import React from "react";
import styles from "./styles.module.css";

const Form = ({ title, id, children, buttonText, extra, errorId, onSubmit }) => {
  return (
    <form id={id} onSubmit={onSubmit}>
      <h2>{title}</h2>
      <div className={styles.formChildren}>{children}</div>
      <p id={errorId} className={styles.error}/>
      <button type="submit" form={id} className={styles.formButton}>{buttonText}</button>
      {extra && <div className={styles.extra}>{extra}</div>}
    </form>
  );
};

export default Form;
