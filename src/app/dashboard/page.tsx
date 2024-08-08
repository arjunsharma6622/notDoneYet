"use client"

import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Profile from "./Profile";
import withAuth from "@/hocs/withAuth";

const fetchAuthenticatedUser = async () => {
  try {
    const response = await axiosInstance.get('/user/authenticatedUser');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error;
  }
};

const Page =  () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchAuthenticatedUser();
        setUserData(data);
      } catch (error) {
        // Handle error (e.g., redirect to login if unauthorized)
      }
    };

    getUserData();
  }, []);

  console.log('userData', userData);


  return (
    <div>
      <Profile userData={userData} setUserData={setUserData}/>
    </div>
  );
};

export default withAuth(Page);