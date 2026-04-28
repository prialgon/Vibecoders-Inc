"use client";
import ChatWindow from "@/components/ChatWindow/ChatWindow";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
const Chat = () => {
  const params = useParams();
  const id = params.id;
  const { profileActive, setProfileActive } = useContext(ProfileWindowContext);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.replace("/login");
    }
    return () => {
      setProfileActive(false);
    };
  }, [router, setProfileActive]);

  useEffect(() => {});

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0>" />
      <ChatWindow id={id} title="Test" />{" "}
      {profileActive ? <ProfileWindow /> : null}
    </>
  );
};

export default Chat;
