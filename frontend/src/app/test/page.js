"use client";
import styles from "./page.module.css";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import ChatMessage from "@/components/ChatMessage/ChatMessage";
import ChatMessageInput from "@/components/ChatMessageInput/ChatMessageInput";

export default function Test() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0>" />
      <ChatWindow title="Test">
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />{" "}
        <ChatMessage message={"Hello, World!"} user={true} />
        <ChatMessage message={"Hello, World!"} user={false} />
        <ChatMessageInput />
      </ChatWindow>
    </>
  );
}
