"use client";
import styles from "./page.module.css";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import ChatMessage from "@/components/ChatMessage/ChatMessage";

export default function Test() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0>" />
      <ChatWindow title="Test">
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
        <ChatMessage message={"Hello, World!"} />
      </ChatWindow>
    </>
  );
}
