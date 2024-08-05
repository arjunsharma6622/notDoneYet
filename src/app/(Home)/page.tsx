"use client"

import withFeed from "@/hocs/withFeed";
import StaticHome from "./Static/Static";

function Home() {
  return (
    <StaticHome />
  );
}

export default withFeed(Home)