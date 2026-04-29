"use client";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Chat = () => {
  const params = useParams();
  const id = params.id;

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0>" />
      <ChatWindow id={id} title="Test" />{" "}
    </>
  );
};

export default Chat;
