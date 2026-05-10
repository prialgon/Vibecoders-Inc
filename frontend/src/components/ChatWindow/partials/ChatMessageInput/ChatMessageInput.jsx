import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRef } from "react";

const ChatMessageInput = ({ handleSendMessage }) => {
  const ref = useRef(null);
  const maxHeight = 200;

  const handleInput = () => {
    const element = ref.current;
    element.style.height = "auto";

    const newHeight = element.scrollHeight;
    element.style.height = Math.min(newHeight, maxHeight) + "px";
    element.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
  };

  const resetInputHeight = () => {
    const element = ref.current;
    if (!element) return;

    element.style.height = "";
    element.style.overflowY = "hidden";
  };

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = input.trim();

    if (!text || sending) return;

    setSending(true);

    setInput("");
    resetInputHeight();

    try {
      await handleSendMessage(text);
    } catch {
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <textarea
        className={styles.input}
        placeholder="Message VibeGPT"
        value={input}
        ref={ref}
        onChange={(e) => setInput(e.target.value)}
        onInput={handleInput}
      />
      <button
        className={styles.button}
        type="submit"
        disabled={sending || !input.trim()}
      >
        {sending ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatMessageInput;
