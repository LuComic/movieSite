import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username: ", type: "text", placeholder: "Dexter Morgan" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "Test User", password: "test" };
        if (credentials?.username === user.name && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.includes("/callback/credentials")) {
        return `${baseUrl}/home`; // Redirect to /home instead
      }
      return url.startsWith(baseUrl) ? url : `${baseUrl}/home`;
    },
  },
}