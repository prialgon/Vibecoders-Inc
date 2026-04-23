"use client";
import React from "react";
import styles from "./page.module.css";
import Taskbar from "@/components/Taskbar/Taskbar";
import ProfileWindow from "@/components/ProfileWindow/ProfileWindow";

export default function Home() {
  return (
    <>
      <ProfileWindow />
    </>
  );
}
