"use client"

import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Profile from "./Profile";

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
        setUserData(data.user);
      } catch (error) {
        // Handle error (e.g., redirect to login if unauthorized)
      }
    };

    getUserData();
  }, []);


  return (
    <div>
      <Profile userData={userData}/>
    </div>
  );
};

export default Page;
