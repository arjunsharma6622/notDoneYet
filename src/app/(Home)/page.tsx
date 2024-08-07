"use client"

import withFeed from "@/hocs/withFeed";
import StaticHome from "./Static";

function Home() {
  return (
    <StaticHome />
  );
}

export default withFeed(Home)