"use client";
import React, { useState } from "react";
import styles from "./styles/authBtn.module.css";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "../Icons/Spinner";

const AuthBtn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: true });
    setIsSigningOut(false);
  };

  return (
    <div className={styles.authBtnWrapper}>
      {status === "authenticated" ? (
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={styles.signOutBtn}
        >
          {isSigningOut ? <Spinner color={"#101828"} /> : <p>Logout</p>}
        </button>
      ) : status === "unauthenticated" ? (
        <Link className={styles.link} href="/auth/signin">
          <p>Login</p>
        </Link>
      ) : null}
    </div>
  );
};

export default AuthBtn;
