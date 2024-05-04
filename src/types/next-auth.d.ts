import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      image?: string;
      role?: string;
      name?: string;
      email?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    image?: string;
    role?: string;
    name?: string;
    email?: string;
  }
}
