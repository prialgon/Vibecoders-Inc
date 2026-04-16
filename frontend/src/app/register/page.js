import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";
import Form from "@/components/Form/Form";

export default function Register() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>VibeGPT | Register</title>
      <SmallWindow title="Register">
        <Form
          title="Register"
          id="registerForm"
          buttonText="Create account"
          errorId="loginError"
          extra={<a href="/login">I already have an account</a>}
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
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required=""
          />
          <input
            className={styles.formInput}
            id="password1"
            type="password"
            name="password1"
            placeholder="Password"
            required=""
          />
          <input
            className={styles.formInput}
            id="password2"
            type="password"
            name="password2"
            placeholder="Re-enter password"
            required=""
          />
        </Form>
      </SmallWindow>
    </>
  );
}
