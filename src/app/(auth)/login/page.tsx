import { googleLogin } from "@/actions/Login";
import { auth } from "@/auth";
import { LoginForm } from "@/components/client/Form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/legacy/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  const user = session?.user;

  if (user) redirect("/dashboard");

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
          <div className="flex gap-4 w-full">
            <form action={googleLogin} className="w-full">
              <Button
                type="submit"
                variant={"google"}
                className="w-full flex items-center justify-center gap-2"
              >
                <Image
                  layout="intrinsic"
                  width={24}
                  height={24}
                  src="/images/google.svg"
                  alt=""
                />
                Login with Google
              </Button>
            </form>
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
