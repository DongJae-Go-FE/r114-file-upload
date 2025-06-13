import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

import { POST_LOGIN_SCHEMA } from "./schema/login/schema";

import HttpRequest from "@/lib/network/HttpRequest";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: { label: "id", type: "text", placeholder: "people" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { id, password } = await POST_LOGIN_SCHEMA.parseAsync(credentials);

          const user = await HttpRequest.set<{ id: string; password: string }>(
            "POST",
            "/api/v1/login",
            {
              id,
              password,
            },
            {
              "Content-Type": "application/json",
            }
          );

          if (user && user.data.id) {
            return {
              id: user.data.id,
              response: "ok",
            };
          }

          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          console.error("로그인 에러:", error);
          return null;
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    signIn: async () => {
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? "/" : url;
    },
  },
});
