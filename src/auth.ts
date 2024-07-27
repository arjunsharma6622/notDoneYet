import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./lib/models/UserModel";
import { connectDB } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin({ cause: "Please provide all fields" });
        }

        // connect to DB here
        await connectDB();

        const user = await User.findOne({ email }).select("+password");

        if (!user)
          throw new CredentialsSignin({ cause: "Invalid Email or Password" });
        // this is for google login one, if a user has signed with google, and again enterring email and password, then it is invalid
        if (!user.password)
          throw new CredentialsSignin({ cause: "Invalid Email or Password" });

        const isMatch = await compare(password, user.password);

        if (!isMatch)
          throw new CredentialsSignin({ cause: "Invalid Email or Password" });

        return {
          name: user.name,
          email: user.email,
          _id: user._id,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectDB();

          const userExists = await User.findOne({ email });

          if (!userExists) {
            await User.create({
              name,
              email,
              image,
              googleId: id,
              userName : email?.split("@")[0],
            });
          }

          return true;
        } catch (error) {
          console.log(error);
          throw new CredentialsSignin("Error creating user");
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      await connectDB();
      const userData = await User.findOne({ email: token?.email });
      token._id = userData?._id;
      token.role = userData?.role;
      token.image = userData?.image;
      // token.userName = userData?.name;
      // token.savedPosts = userData?.savedPosts;
      return token;
    },
    session: async ({ session, token }) => {
      if (session) {
        session.user._id = token?._id;
        session.user.role = token?.role;
        session.user.image = token?.image;
        // session.user.userName = token?.userName;
        // session.user.savedPosts = token?.savedPosts;
      }
      return session;
    },
  },
});
