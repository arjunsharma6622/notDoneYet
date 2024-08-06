import VenuesLoadingSkeleton from "@/components/skeletons/Venue/VenuesLoadingSkeleton";
import { Suspense } from "react";
import Venues from "./(components)/Venues";
import { Metadata, ResolvingMetadata } from "next";
import { CLIENT_HEAD } from "@/lib/utils";

export async function generateMetadata(
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: "Venues - Not Done Yet",
    description: `Discover Top Sports Venues in India, Find the perfect Venue for your Event`,
    openGraph: {
      title: "Venues - Not Done Yet",
      description: `Discover Top Sports Venues in India, Find the perfect Venue for your Event`,
      images: [`${CLIENT_HEAD}/api/og/users?pageName=Venues&heading=Discover Top Sports Venues in India&subHeading=Find the perfect Venue for your Event`],
      siteName: "Not Done Yet",
      url: `https://notdoneyet.in/venues`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Venues - Not Done Yet",
      description: `Discover Top Sports Venues in India, Find the perfect Venue for your Event`,
      images: [`${CLIENT_HEAD}/api/og/users?pageName=Venues&heading=Discover Top Sports Venues in India&subHeading=Find the perfect Venue for your Event`],
    },
  };
}

const page = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full flex gap-10 flex-col items-sart m-5">
        <h1 className="text-3xl font-bold text-center w-full">View all Venues</h1>
        <Suspense fallback={<VenuesLoadingSkeleton />}>
          <Venues />
        </Suspense>
      </div>
    </div>
  )
};

export default page;
