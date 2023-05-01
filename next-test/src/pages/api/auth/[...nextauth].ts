import axios from "axios";
import NextAuth, { NextAuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const user = await axios.post("http://localhost:3001/v1/auth/login", credentials).then(res => res.data);
        return user; 
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {

      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as Session["user"];
      return session
    }
  }
}

export default NextAuth(authOptions)