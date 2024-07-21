import { auth } from "@/auth";
import axios from "axios";
import { API_HEAD } from "@/lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import VenueProfile from "./VenueProfile";

type Props = {
  params: { uniqueName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const uniqueName = params.uniqueName;

  // fetch data
  const venueData = await axios
    .get(
      `https://notdoneyet-server.vercel.app/api/venue/uniqueName/${uniqueName}`,
    )
    .then((res) => res.data)
    .catch((err) => console.error("Error", err.response?.data?.error));

  if (venueData) {
    return {
      title: venueData.name,
      description: venueData.description,
      openGraph: {
        title: venueData.name,
        description: venueData.description,
        images: [...venueData.images],
        siteName: "Not Done Yet",
      },
      twitter: {
        card: "summary_large_image",
        title: venueData.name,
        description: venueData.description,
        images: [...venueData.images],
      },
    };
  }
  return {
    title: "Not Done Yet",
    description: "Not Done Yet",
  };
}

const Page = async ({ params }: { params: { uniqueName: string } }) => {
  const session = await auth();
  const uniqueName = params.uniqueName;

  const venueData = await axios
    .get(`${API_HEAD}/venue/uniqueName/${uniqueName}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err.response?.data?.error));

  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="md:w-[95%] flex md:flex-row md:gap-10 flex-col items-start mt-5">
        <div className="w-full flex flex-col gap-5 md:flex-[9]">
          <VenueProfile venueData={venueData} session={session} />
        </div>
      </div>
    </div>
  );
};

export default Page;
