"use client";
import React from "react";
import styles from "./page.module.css";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

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
