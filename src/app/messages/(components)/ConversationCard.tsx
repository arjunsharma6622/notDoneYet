import { format, isToday, isYesterday } from "date-fns";

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
  const formatDate = (date: any) => {
    const messageDate = new Date(date);

    if (isToday(messageDate)) {
      return format(messageDate, "h:MM");
    } else if (isYesterday(messageDate)) {
      return "Yesterday";
    } else {
      return format(messageDate, "MMMM dd, yyyy");
    }
  };

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
        <img
          src={otherUser?.image}
          alt=""
          loading="lazy"
          className="object-cover rounded-full"
          width="48px"
          height={"48px"}
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

        <div className="flex justify-between items-center">
          <div className="text-xs flex truncated-text w-fit">
            <span>
              {lastMessage?.senderId === session?.user._id
                ? "You: "
                : otherUser?.name + ": "}
              {lastMessage?.content}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
