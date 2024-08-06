import { API_HEAD, CLIENT_HEAD } from "@/lib/utils";
import axios from "axios";
import type { Metadata, ResolvingMetadata } from "next";
import Profile from "./Profile";

type Props = {
  params: { userRole: string; userName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const userRole = params.userRole;
  const userName = params.userName;

  // fetch data
  let userData = null;
  if (userRole !== "venue") {
    userData = await axios
      .get(
        `https://api.notdoneyet.in/user/profile/details?role=${userRole}&userName=${userName}`,
      )
      .then((res) => res.data)
      .catch((err) => console.error("Error", err.response?.data?.error));
  }

  if (userData && userRole !== "venue") {
    return {
      title: userData.name,
      description: `${userData.bio}, ${userData.about}`,
      openGraph: {
        title: userData.name,
        description: `${userData.bio}, ${userData.about}`,
        images: [`${CLIENT_HEAD}/api/og/profile?name=${userData.name}&bio=${userData.bio ? userData.bio : ''}&userName=${userName}&role=${userRole}&image=${userData.image}`],
        siteName: "Not Done Yet",
        url: `https://notdoneyet.in/${userRole}/${userName}`,
      },
      twitter: {
        card: "summary_large_image",
        title: userData.name,
        description: `${userData.bio}, ${userData.about}`,
        images: [`${CLIENT_HEAD}/api/og/profile?name=${userData.name}&bio=${userData.bio ? userData.bio : ''}&userName=${userName}&role=${userRole}&image=${userData.image}`],
      },
    };
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
  const userName = params.userName;
  const userRole = params.userRole;

  let userData = null;
  if (userRole !== "venue") {
    userData = await axios
      .get(
        `${API_HEAD}/user/profile/details?role=${userRole}&userName=${userName}`,
      )
      .then((res) => res.data)
      .catch((err) => console.error("Error", err.response?.data?.error));
  }

  return (
    <>
      {userRole !== "venue" && (
        <div className="relative flex items-center justify-center w-full px-2">
          <div className="md:w-[80%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
            <div className="w-full flex flex-col gap-5 md:flex-[8]">
              {userData && userRole !== "venue" && (
                <Profile userData={userData} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
