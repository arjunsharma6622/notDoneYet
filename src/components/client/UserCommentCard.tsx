import { timeAgo } from "@/lib/utils";
import Image from "next/legacy/image";

const UserCommentCard = ({ comment }: any) => {
  return (
    <div key={comment._id} className="flex items-start flex-col w-full">
      <div className="w-full border-b py-3 flex items-start gap-2">
        <Image
          width={40}
          height={40}
          layout="intrinsic"
          src={comment.user.image}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />

        <div className="flex flex-col gap-1 bg-gray-100 w-full px-3 py-2 rounded-md">
          <div className="w-full flex justify-between items-start">
            <div className="w-fit">
              <p className="text-sm font-medium">{comment.user.name}</p>
            </div>

            <span className="text-xs w-fit">{timeAgo(comment.createdAt)}</span>
          </div>

          <div>
            <p className="text-sm">{comment.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCommentCard;
