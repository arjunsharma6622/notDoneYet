import { API_HEAD, isVideoUrl } from "@/lib/utils";
import axios from "axios";
import ShortsFeedClient from "./ShortsFeedClient";

const Shorts = async ({ userData }: { userData: any }) => {
  const postData = await axios
    .get(`${API_HEAD}/posts/getPosts/user?userId=${userData._id}`)
    .then((res) => res.data.data)
    .catch((err) => console.error("Error", err));

  const allShorts: any[] = [];
  if (postData) {
    postData.forEach((post: any) => {
      if (post.images && post.images.length > 0) {
        post.images.forEach((url: string) => {
          if (isVideoUrl(url)) {
            allShorts.push({ url, post });
          }
        });
      }
    });
  }

  // Fallback Dummy Data to show real YouTube Shorts Style UI
  if (allShorts.length === 0) {
    allShorts.push(
      {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        post: { description: "Amazing visual effects and design concepts! ✨", likes: ["1", "2", "3", "4", "5"], comments: ["1", "2"] }
      },
      {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        post: { description: "Smooth transitions that keep you hooked... 🔥", likes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], comments: ["1", "2", "3"] }
      },
      {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        post: { description: "Introducing the new interactive UI components! 🚀", likes: ["1", "2", "3"], comments: ["1"] }
      }
    );
  }

  return <ShortsFeedClient shorts={allShorts} userData={userData} />;
};

export default Shorts;
