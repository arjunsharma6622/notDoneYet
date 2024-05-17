import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { formatDate } from "../(utils)/FormatDate";

const ConversationCard = ({
  session,
  conversation,
  otherUser,
  lastMessage,
  setCurrentConversation,
  currentConversation,
  setNewUserToSendMsg,
  setWriteNewMsg,
}: any) => {


  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const unread = await axios.get(
          `${API_HEAD}/conversation/${conversation._id}/unread`,
        );
        if(unread?.data?._id != session?.user._id) {
          setUnread(unread.data?.count);        
        }
        else{
          setUnread(0);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUnread()
  }, [currentConversation, session?.user._id, conversation]);

  return (
    <div
      className={`flex items-start justify-start cursor-pointer gap-2 py-4 px-4 ${
        currentConversation?._id === conversation._id ? "bg-gray-100" : ""
      }`}
      onClick={() => {
        setCurrentConversation(conversation);
        setNewUserToSendMsg(null);
        setWriteNewMsg(null);
      }}
      key={conversation._id}
    >
      <div className="">
        <Image
          src={otherUser?.image}
          alt=""
          loading="lazy"
          className="object-cover rounded-full"
          width={48}
          height={48}
          layout="intrinsic"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex flex-col gap-1 justify-start w-full">
        <div className="flex justify-between flex-col items-start w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-sm font-medium">{otherUser?.name}</h1>
            <span className="text-xs text-gray-500">
              {formatDate(lastMessage?.createdAt)}
            </span>
          </div>
          <span className="text-sm text-gray-500"></span>
        </div>

        <div className="relative flex justify-between items-center">
          <div className=" text-xs flex truncated-text w-fit">
            <span className={`${unread > 0 ? "text-black font-medium" : "text-gray-500"}`}>
              {lastMessage?.senderId === session?.user._id
                ? "You: "
                : otherUser?.name?.split(" ")[0] + ": "}
              {lastMessage?.content}
            </span>
            { unread > 0 &&
            <div className="absolute top-0 right-0">
              <div className="flex items-center justify-center w-4 h-4 bg-red-500 rounded-full text-white text-xs">
                {unread}
              </div>
            </div>
        } 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
