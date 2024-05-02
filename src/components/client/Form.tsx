"use client";

import { credentialsLogin } from "@/actions/Login";
import { signup } from "@/actions/Signup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LoginForm = () => {
    const router = useRouter()
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password){
            return toast.error("Please provide all the fields");
        }

        const toastId = toast.loading("Logging in...");

        const error = await credentialsLogin(email, password);

        if(!error) {
            toast.success("Logged in successfully", { id: toastId })
            router.refresh()
        }
        else{
            toast.error(String(error), { id: toastId })
        }
      }}
      className="flex flex-col gap-4"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email" name="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          name="password"
        />
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};


const SignupForm = () => {

  const router = useRouter()

  return(
    <form action={async (formData) => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!name || !email || !password) {
        return toast.error("Please provide all the fields");
      }

      const error = await signup(name, email, password);
      if (!error) {
        toast.success("Account created successfully");    
        router.push("/login");
      } else {
        toast.error(String(error));
      }
      
      
    }} className="flex flex-col gap-4">
    <div className="space-y-1">
      <Label htmlFor="name">Name</Label>
      <Input id="name" type="text" placeholder="name" name="name" />
    </div>

    <div className="space-y-1">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email" name="email" />
    </div>

    <div className="space-y-1">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="password"
        name="password"
      />
    </div>

    <Button type="submit">Signup</Button>
  </form>
  )
}

export { LoginForm, SignupForm };
