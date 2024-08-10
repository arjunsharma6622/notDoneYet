import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { toast } from 'sonner';
import UserCommentCard from './UserCommentCard';

const PostComment = ({ authenticatedUser, postData, commentText, setCommentText } : { authenticatedUser: any, postData: any, commentText: string, setCommentText: any}) => {

    const handlePostComment = async () => {
        try {
          if (!commentText) {
            toast.error("Comment cannot be empty");
            return;
          }
    
          const res: any = await axiosInstance.post(`/posts/addComment`, { 
            postId: postData?._id,
            commentText
           })
    
          
          setCommentText("");
    
          toast.success("Comment posted successfully");
    
          // You might also want to update the postData's comments array here
        } catch (error) {
          console.error(error);
          toast.error("Failed to post comment");
        }
      };

  return (
    <div className="flex flex-col w-full px-4">
    <div className="w-full border-b py-3 flex items-start gap-2">
      <Image
        src={authenticatedUser.image}
        alt="profile"
        width={36}
        height={36}
        className=" rounded-full object-cover"
        referrerPolicy="no-referrer"
      />

      <div className="flex flex-col justify-end items-end w-full">
        <div className=" w-full ">
          <textarea
            className="w-full text-sm border rounded-md px-2 py-2 outline-none bg-transparent"
            placeholder="Add a comment..."
            value={commentText}
            rows={2}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>

        <button
          className="text-base w-fit bg-primary rounded-md text-white px-6 py-1"
          onClick={handlePostComment}
        >
          Post
        </button>
      </div>
    </div>
    <div>
      {postData?.comments?.map((comment: any) => (
        <UserCommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  </div>  
)}

export default PostComment