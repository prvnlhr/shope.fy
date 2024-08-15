import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "password", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the email");
          }

          console.log(credentials.email, credentials.password);

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid Password");
          }

          return {
            userId: user._id,
            email: user.email,
            name: user.fullname,
          };
        } catch (error) {
          console.error("Error authorizing user:", error.message);
          throw new Error(`Authorization failed: ${error.message}`);
        }
      },
    }),
  ],
});
