import { auth } from "@/auth";
import axios from "axios";
import { API_HEAD } from "@/lib/utils";
import Profile from "./Profile";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { userRole: string; userName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const userRole = params.userRole;
  const userName = params.userName;

  // fetch data
  const userData = await axios
    .get(
      `https://notdoneyet-server.vercel.app/api/user/profile/details?role=${userRole}&userName=${userName}`
    )
    .then((res) => res.data)
    .catch((err) => console.error("Error", err.response?.data?.error));

  if (userData) {
    return {
      title: userData.name,
      description: userData.bio,
      openGraph: {
        title: userData.name,
        description: userData.bio,
        images: [userData.image, userData.backgroundImg],
        siteName: "Not Done Yet",
      },
      twitter: {
        card: "summary_large_image",
        title: userData.name,
        description: userData.bio,
        images: [userData.image, userData.backgroundImg],
      },
    }
  }
  return {
    title: "Not Done Yet",
    description: "Not Done Yet",
  };
}

const Page = async ({
  params,
}: {
  params: { userRole: string; userName: string };
}) => {
  const session = await auth();
  const userName = params.userName;
  const userRole = params.userRole;

  const userData = await axios
    .get(
      `${API_HEAD}/user/profile/details?role=${userRole}&userName=${userName}`
    )
    .then((res) => res.data)
    .catch((err) => console.error("Error", err.message));

  return (
    <div className="relative flex items-center justify-center w-full px-2">
      <div className="md:w-[80%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
        <div className="w-full flex flex-col gap-5 md:flex-[8]">
          {userData && <Profile userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
