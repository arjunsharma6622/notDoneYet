"use client";

import useSWR from "swr";
import About from "./(components)/About";
import Certificates from "./(components)/Certificates";
import Experience from "./(components)/Experience";
import Head from "./(components)/Head";
import Posts from "./(components)/Posts";
import Skills from "./(components)/Skills";
import UserProfileSkeleton from "./(components)/UserProfileSkleton";
import Products from "./(components)/brand/Products";
import PastEvents from "./(components)/venue/PastEvents";
import Venues from "./(components)/venue/Venues";
import Education from "./(components)/doctor/Education";
import { API_HEAD } from "@/lib/utils";
import ChooseRole from "@/components/ChooseRole";
import FollowingUsers from "./(components)/FollowingUsers";

const Profile = ({ session, userData }: any) => {
 
  return (
    <div className="relative flex items-center justify-center px-2 ">
      {userData ? (
        <>
          {userData && userData?.role !== "user" ? (
            <div
              className={`${userData?.role == "brand" || userData?.role == "venue" ? "md:w-[80%]" : "md:w-[95%]"} flex  md:flex-row flex-col gap-5 items-start mt-5`}
            >
              <div className="w-full  flex flex-col gap-5 border rounded-md md:flex-[8.5]">
                <Head userData={userData} />
                {userData?.role == "venue" && <Venues userData={userData} />}
                <Posts userData={userData} />
                <About userData={userData} />
                {userData?.role == "brand" && <Products userData={userData} />}
                {(userData?.role == "doctor" ||
                  userData?.role == "athlete") && (
                    <>
                      <Skills userData={userData} />
                      <Experience userData={userData} />
                    </>
                  )}
                {userData?.role == "doctor" && (
                  <Education userData={userData} />
                )}
                {userData?.role == "venue" && (
                  <PastEvents userData={userData} />
                )}
                {(userData?.role == "doctor" ||
                  userData?.role == "athlete") && (
                    <Certificates userData={userData} />
                  )}
              </div>

              {userData?.role !== "brand" && userData?.role !== "venue" && (
                <div className="w-full flex md:flex-col flex-col md:flex-[3] gap-4">
                  <FollowingUsers userId={session?.user?._id} />
                </div>
              )}

              {/* {userData && userData?.role !== "user" ? (
            <div className="w-full  flex flex-col gap-5 border rounded-md md:flex-[8.5]">
              <Head userData={userData} />
              {userData?.role == "venue" && <Venues userData={userData} />}
              <Posts userData={userData} />
              <About userData={userData} />
              {userData?.role == "brand" && <Products userData={userData} />}
              {(userData?.role == "doctor" ||
                userData?.role == "athlete") && (
                  <>
                    <Skills userData={userData} />
                    <Experience userData={userData} />
                  </>
                )}
              {userData?.role == "doctor" && (
                <Education userData={userData} />
              )}
              {userData?.role == "venue" && (
                <PastEvents userData={userData} />
              )}
              {(userData?.role == "doctor" ||
                userData?.role == "athlete") && (
                  <Certificates userData={userData} />
                )}
            </div>
          ) : (
            <ChooseRole userData={userData} />
          )} */}
            </div>
          ) : (
            <ChooseRole className="mt-10" userData={userData} />
          )}
        </>
      ) : (
        <UserProfileSkeleton />
      )
      }
    </div>
  );
};

export default Profile;
