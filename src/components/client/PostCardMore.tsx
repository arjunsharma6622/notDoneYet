"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/context/useAuth";
import { API_HEAD, CLIENT_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import {
  FiCode,
  FiLink,
  FiMoreVertical
} from "react-icons/fi";
import { toast } from "sonner";

const PostCardMore = ({ postData }: any) => {

  const {auth} = useAuth()
  const {user : authenticatedUser} = auth;

  const copyPostLink = () => {
    navigator.clipboard.writeText(`${CLIENT_HEAD}/post/${postData?._id}`);
    toast.success("Post link copied");
  };

  const savePostToUser = async () => {
    try {
      const res: any = await axios.post(
        `${API_HEAD}/user/post/toggleSavePost`,
        {
          postId: postData?._id,
        },
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to save post in your account");
      console.log(err);
    }
  };

  const handlePostDelete = async () => {
    try {
      const res: any = await axiosInstance.delete(`/posts/${postData?._id}`);
      toast.success("Post deleted successfully");
    } catch (err) {
      toast.error("Failed to delete post");
      console.log(err);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <FiMoreVertical className="w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent className=" w-44 px-3 py-3 flex items-start flex-col gap-2 justify-center">

        <div
          onClick={copyPostLink}
          className="text-sm flex items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-2 py-2 rounded-md"
        >
          <FiLink className="w-5 h-5" />
          <p>Copy post link</p>
        </div>
        <div
          onClick={savePostToUser}
          className="text-sm flex items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-2 py-2 rounded-md"
        >
          {authenticatedUser?.savedPosts?.includes(postData?._id) ? (
            <>
              <BiSolidBookmark className="w-5 h-5" />
              <p>Saved Post</p>
            </>
          ) : (
            <>
              <BiBookmark className="w-5 h-5" />
              <p>Save the post</p>
            </>
          )}
        </div>
        <div className="text-sm flex items-center gap-4 cursor-pointer hover:bg-gray-100 w-full px-2 py-2 rounded-md">
          <FiCode className="w-5 h-5" />
          <p>Embed post</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostCardMore;
