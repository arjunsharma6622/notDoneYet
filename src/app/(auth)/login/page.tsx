"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_HEAD } from "@/lib/utils";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_HEAD}/auth/login`, { email, password }, { withCredentials: true });

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
      <div className="md:space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="md:space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};

const Page = () => {
  return (
    <Card className="max-w-1/2 w-full mx-2 md:w-[70%]">
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <LoginForm />
      </CardContent>
      <CardFooter className="flex p-4 md:p-6 flex-col gap-5 md:gap-6 mt-1">
        <div className="w-full relative">
          <hr className="w-full h-[1px]" />
          <span className="text-sm px-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            Or
          </span>
        </div>

        <p className="text-sm">
          {`Don't have an account?`}{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Page;