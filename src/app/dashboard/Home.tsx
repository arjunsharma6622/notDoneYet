"use client";

import { followUser } from "@/actions/user";
import ChooseRole from "@/components/ChooseRole";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import Athlete from "./(athlete)/Athlete";
import RecommendedUsers from "./(components)/RecommendedUsers";


const Home = ({session} : any) => {
  const [allUserPosts, setAllUserPosts] = useState([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data : userData, error, isLoading } = useSWR(`/api/user/email/${session?.user?.email}`, fetcher)

  console.log(userData)




  return (
    <div className="relative flex items-center justify-center px-2 ">
      <div className="md:w-[95%] flex  md:flex-row flex-col gap-5 items-start mt-5">
      { session?.user &&
        <div className="w-full  flex flex-col gap-5 md:flex-[8]">
          {session && userData?.role !== "user" ? (
            <>
              {userData?.role === "athlete" && (
                <Athlete
                    userData={userData}
                  allUserPosts={allUserPosts}
                />
              )}
            </>
          ) : (
            <ChooseRole userData={userData}/>
          )}
        </div>
}
          <div className="w-full flex md:flex-col flex-col md:flex-[4] gap-4">
            { userData &&
                <RecommendedUsers userData={userData}/>
            }
          </div>
      </div>

    </div>
  );
};

export default Home;
