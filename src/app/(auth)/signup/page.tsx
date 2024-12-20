"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import withFeed from "@/hocs/withFeed";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import { getGoogleAuthUrl } from "@/utils/getGoogleAuthUrl";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userNameAvailable, setUserNameAvailable] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  useEffect(() => {
    const checkUserName = async () => {
      try {
        const response = await axiosInstance.get(`/checkUserName?userName=${userName}`);
        const available = response?.data?.available;
        setUserNameAvailable(available);
      } catch (error) {
        console.error("Error checking username availability", error);
      }
    };

    if (userName) {
      checkUserName();
    }
  }, [userName]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !userName) {
      return toast.error("Please provide all the fields");
    }

    if (userName && !userNameAvailable) {
      return toast.error("Username not available");
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_HEAD}/auth/signup`, { name, email, password, userName });

      if (response.status === 201) {
        setIsLoading(false);
        toast.success("Account created successfully");
        router.push("/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
      <div className="md:space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="md:space-y-1">
        <Label htmlFor="userName">User Name</Label>
        <Input
          id="userName"
          type="text"
          placeholder="username"
          name="userName"
          value={userName}
          onChange={handleUserNameChange}
          className={`${!userNameAvailable ? "border-red-500 text-red-500" : ""}`}
        />
        {!userNameAvailable && userName.length > 0 && (
          <span className="text-red-500 text-xs">
            Username not available
          </span>
        )}
      </div>

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
        Signup
        {isLoading &&
          <LoaderCircle className="ml-2 w-5 h-5 animate-spin" />
        }
      </Button>
    </form>
  );
};

const Signup = () => {
  return (
    <Card className="max-w-1/2 w-full mx-2 md:w-[70%]">
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Signup</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 md:py-2">
        <SignupForm />
      </CardContent>
      <CardFooter className="flex p-4 md:p-6 flex-col gap-5 md:gap-6 mt-1">
        <div className="w-full relative">
          <hr className="w-full h-[1px]" />
          <span className="text-sm px-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            Or
          </span>
        </div>

        <Link href={getGoogleAuthUrl()} className="mt-2 flex justify-center gap-4 items-center border rounded-full py-2 px-4 w-full" target="_self">
          <Image src="/images/google.svg" width={20} height={20} alt="google logo" />
          <span className="text-sm">
            Login with google
          </span>
        </Link>

        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default withFeed(Signup);