import { followUser, unfollowUser } from '@/actions/user';
import { auth } from '@/auth';
import AthleteExperienceCard from '@/components/AtheleteExperienceCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from 'axios';

const AthleteProfile = async ({userData} : any) => {
  const session:any = await auth()
  
  const handleFollowClick = async () => {
    "use server"
    try {
      console.log("Following user:", userData._id);
      console.log("Session user:", session?.user?._id);
      await followUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollowClick = async () => {
    "use server"
    try {
      console.log("Unfollowing user:", userData._id);
      console.log("Session user:", session?.user?._id);
      await unfollowUser(userData._id, session?.user?._id);
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  // const [showMore, setShowMore] = useState(false);
  return (
    <div>
    <div className="flex flex-col rounded-md border">
      <div className="relative">
        <img
          src={
            "https://www.fr.com/images/demo/fish-richardson-header-default.png"
          }
          alt=""
          className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
        />
        <img
          src={
            userData.profileImg ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt=""
          className="absolute left-6 -bottom-6 md:-bottom-10 border-white border-4 md:border-8 w-20 h-20 md:w-44 md:h-44 object-cover rounded-full"
        />
      </div>
      <div className="px-3 md:px-6 mt-10 flex items-start justify-between">
        
        <div className="flex flex-col gap-0">
        <span className="text-xs">Athlete</span>

          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <h1 className='mt-1'>{userData.bio}</h1>
        </div>
      </div>

      {userData.followers.includes(session?.user?._id) ? (
        <div className="px-6 flex items-start justify-between">
          <form action={handleUnfollowClick}>
          <button
            className="bg-blue-600 text-white py-1 px-4 rounded-sm"
            type='submit'
          >
            Unfollow
          </button>
          </form>
        </div>
      ) : (
        <div className="px-3 md:px-6 flex items-start justify-between">
          <form action={handleFollowClick}>
          <button
            className="bg-blue-600 text-white py-1 px-4 rounded-sm"
            type='submit'
          >
            Follow
          </button>
          </form>
        </div>
      )}

      <div className="px-3 md:px-6 mt-10 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">About</h2>
          {/* <div className={`${!showMore && "relative max-h-10 md:max-h-12"} overflow-hidden`}>
          <div className={`${!showMore && "max-h-10 md:max-h-12"} text-sm md:text-base overflow-hidden`}>{userData.about}</div>
          { userData.about && !showMore &&
          <button onClick={() => setShowMore(true)} className='text-sm text-gray-500 bg-white bottom-0 right-0 px-1 absolute'>... Read more</button>
}
          </div> */}
        </div>
      </div>

      <div className="px-3 md:px-6 mt-10 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Sports</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {userData.sports?.map((sport : string) => (
            <div
              key={sport}
              className="bg-gray-200 rounded-full px-4 py-1"
            >
              <span className="">{sport}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 md:px-6 mt-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Activity</h2>
        </div>

        <div className="flex flex-col gap-2">
          {userData.posts.map((post : any, index : number) => (
            <div
              key={index}
              className="border rounded-md px-5 py-5 flex flex-col"
            >
              <div className="flex flex-col gap-1 text-sm pt-2 pb-3">
                <p>{post.description}</p>

                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {post.images?.map((_ : any, index :   number) => (
                      <CarouselItem key={index}>
                        <div className="">
                          <img
                            src={post.images[index]}
                            alt={`Slide ${index + 1}`}
                            className="w-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 md:px-6 mt-10 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Experience</h2>
        </div>

        <div className="flex flex-col gap-2">
          {userData.experience?.map((experience : any, index : number) => (
            <AthleteExperienceCard experience={experience} key={index}/>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}

export default AthleteProfile