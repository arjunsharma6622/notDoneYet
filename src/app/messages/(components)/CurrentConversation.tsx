"use client";

import { Button } from "@/components/ui/button";
import { API_HEAD } from "@/lib/utils";
import { formatConversationDate } from "@/utils/FormatDate";
import axiosInstance from "@/utils/axiosInstance";
import { ArrowLeft, LoaderCircle, SendHorizonal } from "lucide-react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useAuth from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";

const CurrentConversation = ({ currentConversationId }: any) => {

  const {auth} = useAuth()
  const {user : authenticatedUser} = auth;

  const [currentMessage, setCurrentMessage] = useState("");
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [currentConversation, setCurrentConversation]: any = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_HEAD}/conversation/${currentConversationId}`,
        );
        setCurrentConversation(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentConversationId]);

  const router = useRouter();

  const messagesEndRef: any = useRef(null);

  const handleSendMessage = async () => {

    try {
      setIsMessageSending(true);
      const response = await axiosInstance.post(
        `${API_HEAD}/conversation/addMessage/${currentConversation?._id}/`, { content: currentMessage });
      
      const newAddedMessage = response?.data?.data

      setCurrentConversation((prevConversation: any) => {
        const updatedMessages = [...prevConversation.messages, newAddedMessage];
        return { ...prevConversation, messages: updatedMessages };
      });
      setIsMessageSending(false);
      setCurrentMessage("");
    } catch (error) {
      setIsMessageSending(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ "behavior" : "instant" });
    }
  }, [currentConversation?.messages]);

  useEffect(() => {
    const updateSeen = async () => {
      console.log("updating seen");
      if (currentConversation) {
        try {
          await axiosInstance.patch(
            `${API_HEAD}/conversation/${currentConversation?._id}/seen`);
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateSeen();
  }, [currentConversation]);



  return (
    <div className="flex-[9] h-full overflow-y-scroll border rounded-xl">
      {currentConversation && (
        <div className=" flex items-start h-full gap-4">
          <div className="relative flex flex-col h-full justify-end w-full">
            <div className="flex gap-2 md:gap-4 items-center justify-start w-full border-b px-3 py-2 md:px-4 md:py-3">
              <ArrowLeft className=" h-5 w-5 cursor-pointer" onClick={() => router.push("/messages")} />

              <div className="flex w-full items-center gap-2">
                <div className="flex w-fit">
                  <Image
                    src={
                      currentConversation?.users?.filter(
                        (user: any) => user?._id !== authenticatedUser?._id,
                      )[0]?.image
                    }
                    alt=""
                    width={40}
                    height={40}
                    layout="intrinsic"
                    className="rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full text-sm flex flex-col">
                  <span>
                    {
                      currentConversation?.users?.filter(
                        (user: any) => user?._id !== authenticatedUser?._id,
                      )[0]?.name
                    }
                  </span>
                  <span className="text-gray-400 text-[9px] md:text-xs truncatedText1">
                    {
                      currentConversation?.users?.filter(
                        (user: any) => user?._id !== authenticatedUser?._id,
                      )[0]?.bio
                    }
                  </span>
                </div>
              </div>
            </div>

            <style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .custom-scrollbar {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
`}</style>

            <div className="flex flex-col gap-2 w-full px-8 pt-4 mb-4 overflow-y-scroll h-full custom-scrollbar">
              {currentConversation?.messages?.map(
                (message: any, index: any) => {
                  const otherUser = currentConversation?.users.filter(
                    (user: any) => user._id !== authenticatedUser._id,
                  )[0];

                  const currentUser = authenticatedUser._id === message.senderId;

                  const showUserImage =
                    index === currentConversation.messages.length - 1 ||
                    currentConversation.messages[index + 1]?.senderId !== message.senderId ||
                    new Date(message.createdAt).getDate() !== new Date(currentConversation.messages[index + 1]?.createdAt).getDate();


                  if (
                    new Date(message.createdAt).getDate() !==
                    new Date(
                      currentConversation?.messages[index - 1]?.createdAt,
                    ).getDate()
                  ) {
                    return (
                      <div key={index} className="flex flex-col gap-4">
                        <div className="relative gap-4 my-4 w-full">
                          <hr />
                          <div className="bg-white px-4 w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div
                              key={index}
                              className="  text-center w-fit text-xs text-black font-medium bg-gray-200 py-1 px-4 rounded-md mx-auto"
                            >
                              {formatConversationDate(message.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div key={index} className="flex flex-col gap-1">
                          <Message
                            key={index}
                            currentUser={message?.senderId === authenticatedUser?._id}
                            message={message}
                            otherUser={otherUser}
                            showImage={showUserImage}
                          />
                          {showUserImage &&
                            <div className={`flex items-center ${currentUser ? "justify-end -mr-2" : "justify-start -ml-2"}`}>

                              <Image
                                src={currentUser ? authenticatedUser.image : otherUser?.image}
                                alt=""
                                width={40}
                                height={40}
                                layout="intrinsic"
                                className="rounded-full"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                          }
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={index} className="flex flex-col gap-1">
                      <Message
                        key={index}
                        currentUser={message.senderId === authenticatedUser?._id}
                        message={message}
                        otherUser={otherUser}
                        showImage={showUserImage}
                      />
                      {showUserImage &&
                        <div className={`flex items-center ${currentUser ? "justify-end -mr-2" : "justify-start -ml-2"}`}>
                          <Image
                            src={currentUser ? authenticatedUser?.image : otherUser?.image}
                            alt=""
                            width={40}
                            height={40}
                            layout="intrinsic"
                            className="rounded-full"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      }


                    </div>

                  );

                }

              )}



              <div ref={messagesEndRef} />
            </div>

            <div className=" bottom-0 w-full py-1 md:py-3 flex items-center justify-center border-t px-2 md:px-8 ">
              <div className="w-full flex justify-start gap-2 md:gap-4 items-center">
                <textarea
                  className=" w-full text-sm py-1 px-2 md:py-2 md:px-3 focus:outline-none resize-none rounded-md"
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  value={currentMessage}
                  placeholder="Type you message"
                />

                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage || isMessageSending}
                  className="bg-blue-600 text-white text-sm  rounded-full flex items-center"
                >
                  {isMessageSending ?
                    <LoaderCircle className="text-xl w-5 h-5 animate-spin" />
                    :
                    <SendHorizonal className="text-xl w-5 h-5" />
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(CurrentConversation);