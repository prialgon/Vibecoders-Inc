"use client";
import React from "react";
import styles from "./page.module.css";
import Taskbar from "@/components/Taskbar/Taskbar";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { profileActive, setProfileActive } = useContext(ProfileWindowContext);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);
  return <>{profileActive ? <ProfileWindow /> : null}</>;
}
