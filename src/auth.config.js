export const authConfig = {
  pages: {
    signIn: "/auth/verifyotp",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  providers: [],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
};
