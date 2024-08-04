import { formatMessageTime } from "@/utils/FormatDate";
import { BiCheckDouble } from "react-icons/bi";

const Message = ({
  message,
  currentUser,
}: any) => {
  return (
    <div
      key={message._id}
      className={`flex ${currentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`${currentUser ? "" : "flex-row-reverse"
          }  flex items-start gap-3`}
      >
        <div
          className={`flex flex-col gap-0 ${currentUser ? "items-end" : "items-start"
            }`}
        >
          <div
            className={`max-w-xl flex relative text-sm items-center gap-4 ${currentUser ? "rounded-br-none" : "rounded-bl-none"
              } bg-gray-200 py-2 rounded-xl px-4`}
          >
            <div>
              <p>{message?.content}</p>

              {message.seen && currentUser && (
                <div className="absolute bottom-[2px] right-1">
                  <BiCheckDouble className="w-4 h-4 text-blue-500" />
                </div>
              )}
              {!message.seen && currentUser && (
                <div className="absolute bottom-[2px] right-1">
                  <BiCheckDouble className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <span className="text-[10px] text-gray-500">
            {formatMessageTime(message?.createdAt)}
          </span>
        </div>
      </div>
    </div>
  )};

export default Message;