"use client";

import About from "./(components)/About";
import Certificates from "./(components)/Certificates";
import ChooseRole from "./(components)/ChooseRole";
import Experience from "./(components)/Experience";
import FollowingUsers from "./(components)/FollowingUsers";
import Head from "./(components)/Head";
import Posts from "./(components)/Posts";
import Skills from "./(components)/Skills";
import UserProfileSkeleton from "./(components)/UserProfileSkleton";
import Products from "./(components)/brand/Products";
import Education from "./(components)/doctor/Education";
import PastEvents from "./(components)/venue/PastEvents";
import Venues from "./(components)/venue/Venues";

const Profile = ({ userData, setUserData }: any) => {

  return (
    <div className="relative flex items-center justify-center px-2 ">
      {userData ? (
        <>
          {userData && userData?.role !== "user" ? (
            <div
              className={`${userData?.role == "brand" || userData?.role == "venue" ? "md:w-[80%]" : "md:w-[95%]"} flex  md:flex-row flex-col gap-5 items-start mt-5`}
            >
              <div className="w-full  flex flex-col gap-5 border rounded-md md:flex-[8.5]">
                <Head userData={userData} setUserData={setUserData}/>
                {userData?.role == "venue" && <Venues userData={userData} setUserData={setUserData}/>}
                <Posts userData={userData} />
                <About userData={userData} setUserData={setUserData}/>
                {userData?.role == "brand" && <Products userData={userData}/>}
                {(userData?.role == "doctor" ||
                  userData?.role == "athlete") && (
                    <>
                      <Skills userData={userData} setUserData={setUserData}/>
                      <Experience userData={userData} setUserData={setUserData}/>
                    </>
                  )}
                {userData?.role == "doctor" && (
                  <Education userData={userData} setUserData={setUserData}/>
                )}
                {userData?.role == "venue" && (
                  <PastEvents userData={userData}/>
                )}
                {(userData?.role == "doctor" ||
                  userData?.role == "athlete") && (
                    <Certificates userData={userData}/>
                  )}
              </div>

              {userData?.role !== "brand" && userData?.role !== "venue" && (
                <div className="w-full flex md:flex-col flex-col md:flex-[3] gap-4">
                  <FollowingUsers />
                </div>
              )}
            </div>
          ) : (
            <ChooseRole className="mt-10" userData={userData} setUserData={setUserData}/>
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