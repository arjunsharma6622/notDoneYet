import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';
import { toast } from 'sonner';
import UserCommentCard from './UserCommentCard';
import { FormButton } from '../ui/FormButton';
import { useState } from 'react';
import useFetchData from '@/hooks/useFetchData';
import CommentCardSkeleton from '../skeletons/Comment/CommentCardSkeleton';

const PostComment = ({ authenticatedUser, postData, commentText, setCommentText }: { authenticatedUser: any, postData: any, commentText: string, setCommentText: any }) => {

  const [postComments, setPostComments] : [[], any] = useState([])

  const [isCommenting, setIsCommenting]: [boolean, any] = useState(false);

  const { isLoading: isPostCommentsLoding } = useFetchData<any>(
    `/posts/${postData?._id}/getComments`,
    (fetchedData) => {
      setPostComments(fetchedData.data);
    }
  );

  const handlePostComment = async () => {
    try {

      if (!commentText) {
        toast.error("Comment cannot be empty");
        return;
      }

      setIsCommenting(true);

      const res: any = await axiosInstance.post(`/posts/addComment`, {
        postId: postData?._id,
        commentText
      })

      console.log(res.data);

      setPostComments((prev : any) => [res.data.data, ...prev]);

      setCommentText("");

      toast.success(res.data.message);

      // You might also want to update the postData's comments array here
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    }
    finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 ">
      <div className="w-full py-2 flex items-start gap-2">
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

          <FormButton
            onClick={handlePostComment}
            disabled={!commentText}
            isLoading={isCommenting}
            text="Post"
          />
        </div>
      </div>
      <div>
        {isPostCommentsLoding ?
        <div className='flex flex-col gap-4'>
          <CommentCardSkeleton />
          <CommentCardSkeleton />
          <CommentCardSkeleton />
          </div>
          :
          postComments?.map((comment: any) => (
            <UserCommentCard key={comment._id} comment={comment} />
          ))}
      </div>
    </div>
  )
}

export default PostComment