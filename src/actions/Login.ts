"use server";

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const credentialsLogin = async (email : string, password : string) => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      const err = error as CredentialsSignin;
      return err.cause;
    }
  };

const googleLogin = async () => {
  await signIn("google");
}

const facebookLogin = async () => {
  await signIn("facebook");
}

  export { credentialsLogin, googleLogin, facebookLogin }