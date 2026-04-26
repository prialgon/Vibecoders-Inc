"use client";
import React from "react";
import styles from "./page.module.css";
import SmallWindow from "@/components/SmallWindow/SmallWindow";
import Form from "@/components/Form/Form";
import { Suspense, useEffect, useState } from "react";
import { get } from "@/utils/APIHandler";
import { handlePasswordChange, handleUserDataSubmit } from "./utils";
import { useRouter } from "next/navigation";
export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("access");
    if (!token) {
      router.replace("/login");
    }
    setLoading(false);
  }, [router]);

  return (
    <>
      {!loading ? (
        <SmallWindow title="User Settings">
          <div className={styles.userData}>
            <Form
              id="userForm"
              buttonText="Change User Information"
              onSubmit={handleUserDataSubmit}
              title="User data"
              errorId="userError"
            >
              <Suspense fallback="Loading user data...">
                {get("api/users/profile").then((res) => {
                  return (
                    <>
                      <h3>Username</h3>
                      <input
                        type="text"
                        defaultValue={res.username}
                        placeholder="Username"
                        className={styles.formInput}
                        name="username"
                        required
                      />
                      <h3>Email</h3>
                      <input
                        type="email"
                        defaultValue={res.email}
                        placeholder="Email"
                        className={styles.formInput}
                        name="email"
                        required
                      />
                    </>
                  );
                })}
              </Suspense>
            </Form>
            <Form
              id="passwordForm"
              buttonText="Change Password"
              onSubmit={handlePasswordChange}
              title="Password"
              errorId="passwordErr"
            >
              <input
                type="password"
                placeholder="Old Password"
                className={styles.formInput}
                name="oldpassword"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                className={styles.formInput}
                name="password1"
                required
              />
              <input
                type="password"
                placeholder="Repeat Password"
                className={styles.formInput}
                name="password2"
                required
              />
            </Form>
          </div>
        </SmallWindow>
      ) : null}
    </>
  );
}
