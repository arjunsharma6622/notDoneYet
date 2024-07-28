import { BiCheckDouble } from "react-icons/bi";
import { formatMessageTime } from "../(utils)/FormatDate";
import Image from "next/legacy/image";

const Message = ({
  message,
  currentUser,
  otherUser,
  showImage,
  session,
}: any) => {
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
          className={`flex flex-col gap-0 ${
            currentUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`max-w-xl flex relative text-sm items-center gap-4 ${
              currentUser ? "rounded-br-none" : "rounded-bl-none"
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
{/* { showImage &&
        <div className="">
          <Image
            src={currentUser ? session?.user?.image : otherUser?.image}
            alt=""
            width={30}
            height={30}
            layout="intrinsic"
            className="rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
} */}
      </div>
    </div>
  );
};

export default Message;
