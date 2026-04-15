import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";

export default function Register() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>VibeGPT | Register</title>
      <SmallWindow>
        <form id="register-form">
          <h2>Create account</h2>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            required=""
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required=""
          />
          <input
            id="password1"
            type="password"
            name="password1"
            placeholder="Password"
            required=""
          />
          <input
            id="password2"
            type="password"
            name="password2"
            placeholder="Re-enter password"
            required=""
          />
          <p id="error-text" />
          <button
            type="submit"
            form="register-form"
            className={styles.register_button}
          >
            Create
          </button>
          <a href="login">Already have an account</a>
        </form>
      </SmallWindow>
      <div className={styles.assistant_container}>
        <div className={styles.speech_bubble}>Welcome to VibeGPT!</div>
        <img src="/imgs/clippy.webp" className={styles.floppy_character} />
      </div>
    </>
  );
}
