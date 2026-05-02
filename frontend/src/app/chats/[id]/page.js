"use client";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
import { get } from "@/utils/APIHandler";
import { ChatTitleContext } from "@/context/ChatTitleContext";

import { AuthContext } from "@/context/AuthContext";
const Chat = () => {
  const params = useParams();
  const id = params.id;
  const { profileActive, setProfileActive } = useContext(ProfileWindowContext);
  const { title, setTitle } = useContext(ChatTitleContext);
  const [localTitle, setLocalTitle] = useState(title);
  const { verifying } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!verifying) {
      const fetchChat = async () => {
        const data = await get(`/api/chats/${id}/`);
        if (!data.title) return;
        setLocalTitle(data.title);
      };
      if (id) fetchChat();
    }
  }, [id, title, verifying]);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {!verifying ? <ChatWindow id={id} title={localTitle} /> : null}
      {profileActive ? <ProfileWindow /> : null}
    </>
  );
};

export default Chat;
