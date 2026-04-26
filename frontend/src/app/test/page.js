"use client";
import styles from "./page.module.css";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import ChatMessage from "@/components/ChatWindow/partials/ChatMessage/ChatMessage";
import ChatMessageInput from "@/components/ChatWindow/partials/ChatMessageInput/ChatMessageInput";

export default function Test() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0>" />
      <ChatWindow id="16" title="Test" />
    </>
  );
}
