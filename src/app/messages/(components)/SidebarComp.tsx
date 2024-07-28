"use client"

import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import { Edit, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConversationCard from './ConversationCard';

const SidebarComp = ({session, currentConversationId} : any) => {

    const [allConversations, setAllConversations] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const conversations = await axios.get(
              `${API_HEAD}/conversation/user/${session?.user._id}`,
            );
    
            const sortedConversations = conversations?.data?.sort((a:any, b:any) => {
              const aLastMsgTime = a.messages[a.messages.length - 1].createdAt;
              const bLastMsgTime = b.messages[b.messages.length - 1].createdAt;
              return bLastMsgTime - aLastMsgTime;
            });
    
            setAllConversations(sortedConversations);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [session?.user._id]);


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

          <div className="w-fit bg-blue-100 text-blue-600 p-2 rounded-full cursor-pointer">
            <Edit
              className="w-5 h-5"
              strokeWidth={1.5}
              // onClick={() => {
              //   setWriteNewMsg(!writeNewMsg);
              //   setNewUserToSendMsg(null);
              //   setCurrentConversation(null);
              // }}
            />
          </div>
        </div>

        <div className="flex flex-col h-full overflow-y-scroll">
          {allConversations?.map((conversation: any, index: number) => {
            const lastMessage = conversation?.messages[conversation.messages.length - 1];
            const otherUser = conversation.users.filter(
              (user: any) => user._id !== session?.user?._id,
            )[0];

            return (
              <ConversationCard
                key={index}
                session={session}
                lastMessage={lastMessage}
                conversation={conversation}
                otherUser={otherUser}
                currentConversationId={currentConversationId}
              />
            );
          })}
        </div>
      </div>
    </div>  )
}

export default SidebarComp