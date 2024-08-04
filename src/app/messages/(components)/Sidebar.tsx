"use client"

import { API_HEAD } from '@/lib/utils';
import axiosInstance from '@/utils/axiosInstance';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConversationCard from './ConversationCard';
import useAuth from '@/context/useAuth';

const Sidebar = () => {
  const {auth} = useAuth();
  const {user : authenticatedUser} = auth;
  
  const [allConversations, setAllConversations] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversations = await axiosInstance.get(
          `${API_HEAD}/conversation/user/getAllConversations`,
        );

        const sortedConversations = conversations?.data?.data?.sort((a: any, b: any) => {
          const aLastMsgTime = a.messages.length > 0 ? new Date(a.messages[a.messages.length - 1].createdAt).getTime() : new Date(a.createdAt).getTime();
          const bLastMsgTime = b.messages.length > 0 ? new Date(b.messages[b.messages.length - 1].createdAt).getTime() : new Date(b.createdAt).getTime();
          return bLastMsgTime - aLastMsgTime;
        });

        setAllConversations(sortedConversations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="border rounded-xl w-full h-full mt-0">
      <div>
        <div className="flex justify-between items-center border-b py-2 px-3 md:py-3 md:px-4 gap-2">
          <div className="flex border rounded-md py-2 px-3 w-full">
            <input
              type="text"
              className="w-full text-xs md:text-sm focus:outline-none"
              placeholder="search message"
            />
            <Search className="inline ml-1 text-lg text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col h-full overflow-y-scroll">
          {allConversations?.map((conversation: any, index: number) => {
            const lastMessage = conversation?.messages[conversation.messages.length - 1];
            const otherUser = conversation.users.filter(
              (user: any) => user._id !== authenticatedUser._id,
            )[0];

            return (
              <ConversationCard
                authenticatedUser={authenticatedUser}
                key={index}
                lastMessage={lastMessage}
                conversation={conversation}
                otherUser={otherUser}
              />
            );
          })}
        </div>
      </div>
    </div>
)}

export default Sidebar