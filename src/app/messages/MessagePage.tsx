"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CurrentConversation from "./(components)/CurrentConversation";
import Sidebar from "./(components)/Sidebar";

const MessagePage = ({ session }: any) => {
  const [currentMessage, setCurrentMessage]: any = useState("");
  const [allConversations, setAllConversations]: any = useState([]);
  const [currentConversation, setCurrentConversation]: any = useState(null);
  const [newUserToSendMsg, setNewUserToSendMsg]: any = useState(null);
  const [writeNewMsg, setWriteNewMsg]: any = useState(false);
  const [allFollowingUsers, setAllFollowingUsers]: any = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get(
          `/api/user/following/${session?.user._id}`,
        );
        setAllFollowingUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const conversations = await axios.get(
          `/api/conversation/user/${session?.user._id}`,
        );

        setAllConversations(conversations.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [session, currentConversation]);

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="flex justify-between gap-4 md:w-[95%] mt-5 overflow-hidden"
        style={{ height: "85vh" }}
      >
        <Sidebar
          allConversations={allConversations}
          setCurrentConversation={setCurrentConversation}
          session={session}
          setWriteNewMsg={setWriteNewMsg}
          writeNewMsg={writeNewMsg}
          setNewUserToSendMsg={setNewUserToSendMsg}
          currentConversation={currentConversation}
        />

        <CurrentConversation
          currentConversation={currentConversation}
          session={session}
          setCurrentConversation={setCurrentConversation}
          writeNewMsg={writeNewMsg}
          newUserToSendMsg={newUserToSendMsg}
          allFollowingUsers={allFollowingUsers}
          setNewUserToSendMsg={setNewUserToSendMsg}
          setWriteNewMsg={setWriteNewMsg}
        />
      </div>
    </div>
  );
};

export default MessagePage;
