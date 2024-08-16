"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import ArrowIcon from "../Common/Icons/ArrowIcon";
import CrossIcon from "../Common/Icons/CrossIcon";
import styles from "./styles/signInForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "../Common/Icons/Spinner";

const SignInForm = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log(values.email, values.password);
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (res.error) {
          const error = JSON.parse(res.error);
          throw new Error(error);
        } else {
          console.log("Successfully signed in", res);
          router.push("/");
        }
      } catch (error) {
        console.error("Sign-ip error:", error);
        setErrors({ formError: error.message || "Sign-up error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDemoLogin = () => {
    formik.setFieldValue("email", "prvnlhr522@gmail.com");
    formik.setFieldValue("password", "123456");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.SignInFormWrapper}>
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
          <div className={styles.headerCell}>
            <Link className={styles.closeLink} href="/">
              <div className={styles.closeIconDiv}>
                <CrossIcon color={"white"} />
              </div>
            </Link>
          </div>
          <div className={styles.messageCell}>
            {formik.errors.formError && (
              <div className={styles.messageDiv}>
                <p>{formik.errors.formError}</p>
              </div>
            )}
          </div>
          <div className={styles.emailCell}>
            <div className={styles.inputGroup}>
              <div className={styles.labelCell}>
                <label htmlFor="email">
                  <p>EMAIL</p>
                </label>
              </div>
              <div className={styles.inputCell}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div className={styles.errorGroup}>
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
          </div>
          <div className={styles.passwordCell}>
            <div className={styles.inputGroup}>
              <div className={styles.labelCell}>
                <label htmlFor="password">
                  <p>PASSWORD</p>
                </label>
              </div>
              <div className={styles.inputCell}>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className={`${styles.errorGroup}`}>
              {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
              <button type="button" onClick={handleDemoLogin}>
                Demo Login
              </button>
            </div>
          </div>
          <div className={styles.buttonCell}>
            <button
              type="submit"
              disable={formik.isSubmitting ? true : undefined}
              className={styles.submitBtn}
            >
              <div className={styles.textDiv}>
                <p>SignIn</p>
              </div>
              <div className={styles.btnIconDiv}>
                {formik.isSubmitting ? (
                  <Spinner />
                ) : (
                  <ArrowIcon color={"white"} />
                )}
              </div>
            </button>
          </div>
          <div className={styles.footerCell}>
            <p>Not yet Registered?</p>
            <Link className={styles.footerLink} href="/auth/signup">
              <p>Sign Up</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
