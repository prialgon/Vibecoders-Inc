"use client";
import Image from "next/image";
import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  useEffect(() => router.replace("/home"), [router]);
  return <></>;
}
