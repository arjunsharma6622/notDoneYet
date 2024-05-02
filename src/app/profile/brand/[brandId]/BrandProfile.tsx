import { followUser, unfollowUser } from '@/actions/user';
import { auth } from '@/auth';

const BrandProfile = async ({userData} : {userData : any}) => {
  const session:any = await auth()

  const handleFollowClick = async () => {
    "use server"
    try {
      await followUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollowClick = async () => {
    "use server"
    try {
      await unfollowUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };


  return (
    <div>BrandProfile</div>
  )
}

export default BrandProfile