"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "@/lib/api/auth/authApi";
import Link from "next/link";
import styles from "./styles/signupForm.module.css";
import ArrowIcon from "../Common/Icons/ArrowIcon";
import CrossIcon from "../Common/Icons/CrossIcon";
import { useRouter } from "next/navigation";
import Spinner from "../Common/Icons/Spinner";

const SignUpForm = () => {
  const router = useRouter();
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signUpSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await signUp(values);
        if (res.message !== "Sign Up Successful") {
          setErrors({ formError: res.message || "Unexpected error" });
          router.push("/auth/signin");
        }
      } catch (error) {
        console.error("Sign-up error:", error);
        setErrors({ formError: error.message || "Sign-up error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.signUpFormWrapper}>
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
          <div className={styles.fullNameCell}>
            <div className={styles.inputGroup}>
              <div className={styles.labelCell}>
                <label htmlFor="fullname">
                  <p>FULL NAME</p>
                </label>
              </div>
              <div className={styles.inputCell}>
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div className={styles.errorGroup}>
              {formik.errors.fullname && formik.touched.fullname && (
                <p>{formik.errors.fullname}</p>
              )}
            </div>
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
            <div className={styles.errorGroup}>
              {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>
          </div>
          <div className={styles.confirmPasswordCell}>
            <div className={styles.inputGroup}>
              <div className={styles.labelCell}>
                <label htmlFor="confirmPassword">
                  <p>CONFIRM PASSWORD</p>
                </label>
              </div>
              <div className={styles.inputCell}>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div className={styles.errorGroup}>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p>{formik.errors.confirmPassword}</p>
                )}
            </div>
          </div>
          <div className={styles.buttonCell}>
            <button
              type="submit"
              disable={formik.isSubmitting ? true : undefined}
              className={styles.btn}
            >
              <div className={styles.textDiv}>
                <p>SignUp</p>
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
            <p>Already Registered?</p>
            <Link className={styles.footerLink} href="/auth/signin">
              <p>Sign In</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
