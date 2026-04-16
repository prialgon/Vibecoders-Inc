import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";
import Form from "@/components/Form/Form";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>VibeGPT | Login</title>
      <SmallWindow>
        <Form
          title="Login"
          id="loginForm"
          buttonText="Login"
          errorId="loginError"
          extra={<Link href="/register">Create your account</Link>}
        >
          <input
            className={styles.formInput}
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            required=""
          />
          <input
            className={styles.formInput}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required=""
          />
        </Form>
      </SmallWindow>
    </>
  );
}
