"use client";

import React from "react";
import useSWR from "swr";
import Head from "./(components)/Head";
import RecommendedUsers from "./(components)/RecommendedUsers";
import About from "./(components)/About";
import Posts from "./(components)/Posts";
import UserProfileSkeleton from "./(components)/UserProfileSkleton";
import Skills from "./(components)/Skills";
import Experience from "./(components)/Experience";
import Venues from "./(components)/Venues";
import Education from "./(components)/Education";
import Products from "./(components)/Products";
import PastEvents from "./(components)/PastEvents";
import Certificates from "./(components)/Certificates";

const Profile = ({ session }: any) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: userData,
    error,
    isLoading,
  } = useSWR(`/api/user/email/${session?.user?.email}`, fetcher);

  return (
    <div className="relative flex items-center justify-center px-2 ">
      {userData ? (
        <div className="md:w-[95%] flex  md:flex-row flex-col gap-5 items-start mt-5">
          <div className="w-full  flex flex-col gap-5 border rounded-md md:flex-[8]">
            <Head userData={userData} />
            {userData?.role == "venueOwner" && <Venues userData={userData} />}
            {userData?.role == "brand" && <Products userData={userData} />}
            <Posts userData={userData} />
            <About userData={userData} />
            {(userData?.role == "doctor" || userData?.role == "athlete") && (
              <>
                <Skills userData={userData} />
                <Experience userData={userData} />
              </>
            )}
            {userData?.role == "doctor" && <Education userData={userData} />}
            {userData?.role == "venueOwner" && (
              <PastEvents userData={userData} />
            )}
            {(userData?.role == "doctor" || userData?.role == "athlete") && (
              <Certificates userData={userData} />
            )}
          </div>

          <div className="w-full flex md:flex-col flex-col md:flex-[4] gap-4">
            <RecommendedUsers userData={userData} />
          </div>
        </div>
      ) : (
        <UserProfileSkeleton />
      )}
    </div>
  );
};

export default Profile;
