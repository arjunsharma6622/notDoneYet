"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CLIENT_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import { LoaderCircle, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  FiLink,
  FiMoreVertical
} from "react-icons/fi";
import { toast } from "sonner";

const DashboardPostCardMore = ({ postData, moreOptionsOpen, setMoreOptionsOpen, setUserPosts }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const copyPostLink = () => {
    navigator.clipboard.writeText(`${CLIENT_HEAD}/post/${postData?._id}`);
    toast.success("Post link copied");
  };

  const handlePostDelete = async () => {
    try {
      setIsDeleting(true);
      const res: any = await axiosInstance.delete(`/posts/${postData?._id}`);
      setUserPosts((prev: any) => prev.filter((post: any) => post._id !== postData?._id));
      if(res?.data?.statusCode === 200) toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to delete post");
      console.log(err);
    }finally{
      setIsDeleting(false);
      setMoreOptionsOpen(false);
    }
  };

  return (
    <Popover open={moreOptionsOpen} onOpenChange={setMoreOptionsOpen}>
      <PopoverTrigger>
        <FiMoreVertical className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent className=" w-44 px-3 py-3 flex items-start flex-col gap-2 justify-center">
        <>
          <div
            onClick={() => {
              setMoreOptionsOpen(false);
              copyPostLink();
            }}
            className="text-sm flex items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-2 py-2 rounded-md"
          >
            <FiLink className="w-5 h-5" />
            <p>Copy post link</p>
          </div>
          <div
            onClick={copyPostLink}
            className="text-sm flex items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-2 py-2 rounded-md"
          >
            <PencilLine className="w-5 h-5" />
            <p>Edit Post</p>
          </div>
          <div
            onClick={handlePostDelete}
            className="text-sm flex text-red-500 items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-2 py-2 rounded-md"
          >
            {isDeleting ?
              <LoaderCircle className="w-5 h-5 animate-spin" /> :
              <Trash2 className="w-5 h-5" />
            }
            <p>{isDeleting ? "Deleting..." : "Delete Post"}</p>
          </div>
        </>
      </PopoverContent>
    </Popover>
  );
};

export default DashboardPostCardMore;
