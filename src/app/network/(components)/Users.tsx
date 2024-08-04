"use client"

import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';

const getRecommendedUsers = async () => {
  try{
    const response = await axiosInstance.get(`/user/recommended`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    throw error;
  }
}

const Users = () => {
  const [users, setUsers] : any = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getRecommendedUsers();
        setUsers(data.recommendedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, []);

    return (
    <div className="md:grid md:grid-cols-4 md:items-start flex flex-col gap-4 justify-center items-center">
        {users?.map((user: any) => (
          <UserCard key={user._id} user={user} />
        ))}
    </div>
  )
}

export default Users