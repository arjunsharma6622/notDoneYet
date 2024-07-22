import React, { useEffect } from "react";
import { FiEdit, FiSearch } from "react-icons/fi";
import ConversationCard from "./ConversationCard";

const Sidebar = ({
  setAllConversations,
  allConversations,
  session,
  setWriteNewMsg,
  writeNewMsg,
  setNewUserToSendMsg,
  setCurrentConversation,
  currentConversation,
}: any) => {
  return (
    <div className="flex-[3] border rounded-md">
      <div>
        <div className="flex justify-between items-center border-b py-3 px-4">
          <div className="border rounded-md py-2 px-3">
            <input
              type="text"
              className="w-fit text-sm focus:outline-none"
              placeholder="search message"
            />
            <FiSearch className="inline ml-1 text-lg text-gray-400" />
          </div>

          <div className="">
            <FiEdit
              className="inline ml-1 text-xl cursor-pointer"
              onClick={() => {
                setWriteNewMsg(!writeNewMsg);
                setNewUserToSendMsg(null);
                setCurrentConversation(null);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col h-full gap-1 overflow-y-scroll">
          {allConversations?.map((conversation: any, index: number) => {
            const lastMessage = conversation?.messages[conversation.messages.length - 1];
            const otherUser = conversation.users.filter(
              (user: any) => user._id !== session?.user._id,
            )[0];

            return (
              <ConversationCard
                key={index}
                session={session}
                lastMessage={lastMessage}
                conversation={conversation}
                otherUser={otherUser}
                setCurrentConversation={setCurrentConversation}
                currentConversation={currentConversation}
                setNewUserToSendMsg={setNewUserToSendMsg}
                setWriteNewMsg={setWriteNewMsg}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
