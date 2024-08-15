const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3000";

export async function signUp(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Sign-Up failed:", errorMessage);
      throw new Error(errorMessage.message || "Sign-up failed");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Sign-Up error:", error);
    throw new Error(`${error.message}`);
  }
}
