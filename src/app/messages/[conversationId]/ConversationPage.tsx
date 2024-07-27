"use client"

import { API_HEAD } from '@/lib/utils';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CurrentConversation from '../(components)/CurrentConversation';

const ConversationPage = ({ session, currentConversationId }: any) => {
    const [currentMessage, setCurrentMessage]: any = useState("");
    const [allConversations, setAllConversations]: any = useState([]);
    const [newUserToSendMsg, setNewUserToSendMsg]: any = useState(null);
    const [writeNewMsg, setWriteNewMsg]: any = useState(false);
    const [allFollowingUsers, setAllFollowingUsers]: any = useState([]);  
    const [newMsgSent, setNewMsgSent] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const users = await axios.get(
            `${API_HEAD}/user/following/${session?.user._id}`,
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
    }, [session?.user._id, newMsgSent]);



  
  
    return (
      <div className="flex items-center justify-center w-full">
        <div
          className="flex justify-between gap-4 mt-5 w-full"
          style={{ height: "85vh" }}
        >
          <CurrentConversation
            currentConversationId={currentConversationId}
            session={session}
            writeNewMsg={writeNewMsg}
            newUserToSendMsg={newUserToSendMsg}
            allFollowingUsers={allFollowingUsers}
            setNewUserToSendMsg={setNewUserToSendMsg}
            setWriteNewMsg={setWriteNewMsg}
            setNewMsgSent={setNewMsgSent}
            newMsgSent={newMsgSent}
          />
        </div>
    </div>
    );
  };

export default ConversationPage