import UsersLoadingSkeleton from "@/components/skeletons/User/UsersLoadingSkeleton";
import { CLIENT_HEAD } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";
import Doctors from "./(components)/Doctors";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Doctors - Not Done Yet",
    description: `Connecting Athletes with Expert Medical Professionals, Find the right Doctor for your Needs`,
    openGraph: {
      title: "Doctors - Not Done Yet",
      description: `Connecting Athletes with Expert Medical Professionals, Find the right Doctor for your Needs`,
      images: [`${CLIENT_HEAD}/api/og/users?pageName=Doctors&heading=Connecting Athletes with Expert Medical Professionals&subHeading=Find the right Doctor for your Needs`],
      siteName: "Not Done Yet",
      url: `https://notdoneyet.in/doctors`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Doctors - Not Done Yet",
      description: `Connecting Athletes with Expert Medical Professionals, Find the right Doctor for your Needs`,
      images: [`${CLIENT_HEAD}/api/og/users?pageName=Doctors&heading=Connecting Athletes with Expert Medical Professionals&subHeading=Find the right Doctor for your Needs`],
    },
  };
}

const page = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full flex gap-10 flex-col items-sart m-5">
        <h1 className="text-3xl font-bold text-center w-full">View all Doctors</h1>
        <Suspense fallback={<UsersLoadingSkeleton />}>
          <Doctors />
        </Suspense>
      </div>
    </div>
  )
};

export default page;
