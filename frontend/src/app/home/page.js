"use client";
import React from "react";
import styles from "./page.module.css";
import Taskbar from "@/components/Taskbar/Taskbar";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";
import { ProfileWindowContext } from "@/context/ProfileWindowContext";
import { useContext } from "react";
export default function Home() {
  const { profileActive, setProfileActive } = useContext(ProfileWindowContext);
  return <>{profileActive ? <ProfileWindow /> : null}</>;
}
