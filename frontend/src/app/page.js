import Image from "next/image";
import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";
export default function Home() {
  return (
    <>
      <SmallWindow title="Login">
        <p>Whats up you vibecoders!</p>
      </SmallWindow>
    </>
  );
}
