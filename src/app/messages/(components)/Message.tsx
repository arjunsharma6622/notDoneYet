import dateFormat from "dateformat";
import { BiCheckDouble } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";

const Message = ({ message, currentUser, otherUser, showImage, session }: any) => {
  return (
    <div
      key={message._id}
      className={`flex ${currentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`${
          currentUser ? "" : "flex-row-reverse"
        }  flex items-start gap-3`}
      >
        <div
          className={`flex flex-col gap-1 ${
            currentUser ? "items-end" : "items-start"
          }`}
        >
          <span className="text-xs text-gray-500">
            {dateFormat(message?.createdAt, "HH:MM")}
          </span>

          <div
            className={`flex relative text-sm items-center gap-4 ${
              currentUser ? "rounded-tr-none" : "rounded-tl-none"
            } bg-gray-100 py-2 rounded-xl px-4`}
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
        </div>

        <div className="">
          <img
            src={currentUser ? session?.user?.image : otherUser?.image}
            alt=""
            className="rounded-full w-10 h-10"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
