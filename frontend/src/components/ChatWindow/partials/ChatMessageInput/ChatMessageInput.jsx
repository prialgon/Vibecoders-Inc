import React from "react";
import styles from "./styles.module.css";
import { useRef } from "react";

const ChatMessageInput = () => {
  const ref = useRef(null);
  const maxHeight = 200;

  const handleInput = () => {
    const element = ref.current;
    element.style.height = "auto";

    const newHeight = element.scrollHeight;
    element.style.height = Math.min(newHeight, maxHeight) + "px";
    element.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
  };

  return (
    <div className={styles.inputContainer}>
      <textarea
        className={styles.input}
        placeholder="Message VibeGPT"
        ref={ref}
        onInput={handleInput}
      />
      <button className={styles.button}>Send</button>
    </div>
  );
};

export default ChatMessageInput;
