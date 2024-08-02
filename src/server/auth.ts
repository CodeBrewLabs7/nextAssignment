import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { userService } from "./services/userService";

const credentialsSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});



// this is where credentials are l
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") {
        console.log("------------ JWT ------------");
      console.log({token}, {account}, {profile});
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("------------ SESSION ------------");
      console.log({session}, {token}, {user});
      session.user.id = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const result = credentialsSchema.safeParse(credentials);
        if (!result.success) {
          throw new Error("Invalid credentials");
        }
        const { username, password } = result.data;
        return userService.authenticate(username, password);
      }
    })
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
