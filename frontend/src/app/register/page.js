"use client";

import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";
import Form from "@/components/Form/Form";
import Link from "next/link";
import { doRegister } from "./utils";

export default function Register() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <SmallWindow title="Register">
        <Form
          title="Register"
          id="registerForm"
          buttonText="Create account"
          errorId="registerError"
          onSubmit={doRegister}
          extra={<Link href="/login">I already have an account</Link>}
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
