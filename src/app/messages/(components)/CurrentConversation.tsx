import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import Message from "./Message";
import { format, isToday, isYesterday } from "date-fns";
import { Button } from "@/components/ui/button";

const formatDate = (date: any) => {
  const messageDate = new Date(date);

  if (isToday(messageDate)) {
    return `Today`;
  } else if (isYesterday(messageDate)) {
    return `Yesterday`;
  } else {
    return format(messageDate, "MMMM dd, yyyy");
  }
};

const CurrentConversation = ({
  currentConversation,
  setCurrentConversation,
  session,
  writeNewMsg,
  newUserToSendMsg,
  allFollowingUsers,
  setNewUserToSendMsg,
  setWriteNewMsg,
}: any) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const messagesEndRef: any = useRef(null);

  const handleSendMessage = async () => {
    if (!currentConversation) {
      return;
    }

    const message = {
      senderId: session?.user._id,
      content: currentMessage,
    };

    try {
      const response = await axios.post(
        `/api/conversation/${currentConversation?._id}/`,
        message,
      );

      setCurrentConversation((prevConversation: any) => {
        const updatedMessages = [...prevConversation.messages, response.data];
        return { ...prevConversation, messages: updatedMessages };
      });
      setCurrentMessage("");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstMessage = async () => {
    try {
      const firstConversation = await axios.post(`/api/conversation/`, {
        senderId: session?.user._id,
        recipientId: newUserToSendMsg._id,
        content: currentMessage,
      });
      setCurrentConversation(firstConversation.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation?.messages]);

  return (
    <div className="flex-[9] h-full overflow-y-scroll border rounded-md">
      {currentConversation && (
        <div className=" flex items-start h-full gap-4">
          <div className="relative flex flex-col h-full justify-end w-full">
            <div className="flex items-start gap-2 border-b px-4 py-3">
              <div>
                <img
                  src={
                    currentConversation?.users?.filter(
                      (user: any) => user._id !== session?.user._id,
                    )[0]?.image
                  }
                  alt=""
                  className="rounded-full h-10 w-10 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-sm flex flex-col">
                <span>
                  {
                    currentConversation?.users?.filter(
                      (user: any) => user._id !== session?.user._id,
                    )[0]?.name
                  }
                </span>
                <span className="text-gray-400 text-xs">
                  {
                    currentConversation?.users?.filter(
                      (user: any) => user._id !== session?.user._id,
                    )[0]?.bio
                  }
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full px-8 overflow-y-scroll h-full">
              {currentConversation?.messages?.map(
                (message: any, index: any) => {
                  const otherUser = currentConversation?.users.filter(
                    (user: any) => user._id !== session?.user._id,
                  )[0];

                  if (
                    new Date(message.createdAt).getDate() !==
                    new Date(
                      currentConversation?.messages[index - 1]?.createdAt,
                    ).getDate()
                  ) {
                    return (
                      <div
                        key={index}
                        className="text-center text-xs text-black font-medium bg-gray-200 py-1 px-4 rounded-md mx-auto mt-4"
                      >
                        {formatDate(message.createdAt)}
                      </div>
                    );
                  }

                  return (
                    <Message
                      key={index}
                      currentUser={message.senderId === session?.user._id}
                      session={session}
                      message={message}
                      otherUser={otherUser}
                    />
                  );
                },
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className=" bottom-0 w-full py-3 flex items-center justify-center border-t px-8 ">
              <div className="w-full flex justify-between gap-4 items-center">
                <textarea
                  className="border w-full text-sm py-2 px-3 focus:outline-none resize-none rounded-md"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  value={currentMessage}
                  placeholder="Type you message"
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage}
                  className="bg-blue-600 text-white w-fit text-sm px-4 py-2 rounded-md flex items-center gap-2"
                >
                  Send <FiSend className="inline ml-1 text-xl w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {writeNewMsg && (
        <div className="flex flex-col gap-10 h-full px-6 py-4">
          <h1>Who to message</h1>
          <div className="flex flex-col gap-4">
            {allFollowingUsers.map((user: any, index: number) => (
              <div
                key={index}
                className="flex items-start gap-2 cursor-pointer"
                onClick={() => {
                  setNewUserToSendMsg(user);
                  setWriteNewMsg(false);
                  setCurrentConversation(null);
                }}
              >
                <div>
                  <img
                    src={user.image}
                    alt=""
                    className="rounded-full h-10 w-10 object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-sm flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-gray-400 text-xs">{user.bio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {newUserToSendMsg && (
        <div className=" flex items-start h-full gap-4">
          <div className="flex flex-col h-full justify-between w-full">
            <div className="flex items-start gap-2 border-b px-4 py-3">
              <div>
                <img
                  src={newUserToSendMsg.image}
                  alt=""
                  className="rounded-full h-10 w-10 object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-sm flex flex-col">
                <span>{newUserToSendMsg.name}</span>
                <span className="text-gray-400 text-xs">
                  {newUserToSendMsg.bio}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-8 w-full h-full px-8 overflow-y-scroll"></div>

            <div className="w-full py-3  flex items-end justify-center border-t px-8 ">
              <div className="w-full flex justify-between gap-4 items-center">
                <textarea
                  className="border w-full text-sm py-2 px-3 focus:outline-none resize-none rounded-md"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  value={currentMessage}
                  placeholder="Type you message"
                />

                <button
                  onClick={handleFirstMessage}
                  className="bg-blue-600 text-white w-fit text-sm px-4 py-2 rounded-md flex items-center gap-2"
                >
                  Send <FiSend className="inline ml-1 text-xl w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentConversation;
