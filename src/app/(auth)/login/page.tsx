"use client"

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
import useAuth from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import withFeed from "@/hocs/withFeed";
import axiosInstance from "@/utils/axiosInstance";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const Page = () => {
  const { auth, setAuth } = useAuth();
  const { user: authenticatedUser } = auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(`/auth/login`, { email, password });

      if (response.status === 200 && response.data.success && response.data.data) {
        setIsLoading(false);
        // if login successful the set the setAuth from context
        setAuth({
          isAuthenticated: true,
          user: response.data.data.user
        })
        toast.success(response.data.message);
        setIsRedirecting(true); // Set redirecting state to true
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (authenticatedUser) {
      router.push("/feed");
    }
  }, [router, authenticatedUser]);

  if (isRedirecting) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderCircle className="w-10 h-10 animate-spin text-red-600" />
        <span className="ml-2">Redirecting...</span>
      </div>
    );
  }
  return (
    <Card className="max-w-1/2 w-full mx-2 md:w-[70%]">
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">

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

          <Button type="submit">
            Login
            {isLoading &&
              <LoaderCircle className="ml-2 w-5 h-5 animate-spin" />
            }
          </Button>
        </form>
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

export default withFeed(Page);