import AthleteExperienceCard from "@/components/AtheleteExperienceCard";
import { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import AboutProfileEdit from "../(components)/AboutProfileEdit";
import BasicProfileEdit from "../(components)/BasicProfileEdit";
import PostForm from "../(components)/PostForm";
import AddExperience from "./(components)/AddExperience";
import EditExperience from "./(components)/EditExperience";
import SportsEdit from "./(components)/SportsEdit";
import ShowMoreText from "react-show-more-text";


const Athlete = ({allUserPosts, userData} : any) => {
    const [openImagesEdit, setOpenImagesEdit] = useState(false);
    const [openAboutEdit, setOpenAboutEdit] = useState(false);
    const [openDetailsEdit, setOpenDetailsEdit] = useState(false);
    const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
    const [openExperienceEdit, setOpenExperienceEdit] = useState(false);
    const [openPostForm, setOpenPostForm] = useState(false);
    const [openSportsEdit, setOpenSportsEdit] = useState(false);

  return (
    <div>
      <div className="flex flex-col rounded-md border gap-5">
        <div className="relative">
          <img
            src={ userData?.backgroundImg || "https://www.fr.com/images/demo/fish-richardson-header-default.png" }
            referrerPolicy="no-referrer"
            alt=""
            className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
          />
          <img
            src={userData?.image || "https://www.fr.com/images/demo/fish-richardson-header-default.png"}
            referrerPolicy="no-referrer"
            alt=""
            className="absolute left-6 md:-bottom-10 -bottom-6 border-4 w-20 h-20 border-white md:border-8 md:w-44 md:h-44 object-cover rounded-full"
          />

          <div className="text-gray-600 absolute right-6 top-6 bg-white cursor-pointer rounded-full p-[6px]">
            <FiEdit3
              className="h-5 w-5 md:h-6 md:w-6"
              onClick={() => setOpenImagesEdit(true)}
            />
          </div>
        </div>

        <div className="px-2 md:px-6 mt-2 flex flex-col">
        <span className="text-xs">Athlete</span>

          <div className="flex justify-between items-center">
            
            <h1 className="md:text-3xl text-lg font-bold">{userData?.name}</h1>
            <FiEdit3
              className="cursor-pointer md:h-6 md:w-6 w-5 h-5 text-gray-600"
              onClick={() => setOpenDetailsEdit(true)}
            />
          </div>

          <h1 className="text-sm md:text-base">{userData?.bio}</h1>
        </div>

        <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-xl font-bold">Posts</h2>

            <div
            className="flex cursor-pointer justify-start w-fit bg-gray-200 rounded-full md:px-4 px-3 py-1 items-center gap-1 md:gap-2"
            onClick={() => setOpenPostForm(true)}
          >
            <FiPlus className="cursor-pointer h-5 md:h-6 w-5 md:w-6 text-gray-600" />
            <span className="md:text-sm text-xs">Add New Post</span>
          </div>
          </div>



          {allUserPosts?.map((post : any) => (
            <div key={post._id} className="flex items-start gap-2 justify-start">
              <div className="">
                <img
                  src={post.images[0]}
                  alt=""
                  className="w-24 object-cover h-24 rounded-md"
                />
              </div>
              <div className="w-full text-sm">
                <ShowMoreText
                  /* Default options */
                  lines={3}
                  more="Show more"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={"... "}
                  less={false}
                >
                  <p className="">{post.description}</p>
                </ShowMoreText>{" "}
              </div>
            </div>
          ))}
        </div>

        <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-xl font-bold">About</h2>
            <FiEdit3
              className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              onClick={() => setOpenAboutEdit(true)}
            />
          </div>

          <p className="text-sm truncated-text-3">{userData?.about}</p>
        </div>

        <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Sports</h2>

            <div className="flex justify-start items-center gap-4">
              <FiEdit3
                className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
                onClick={() => setOpenSportsEdit(true)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {userData?.sports?.map((sport : string) => (
              <div key={sport} className="bg-gray-200 rounded-full px-3 py-[2px] md:px-4 md:py-1">
                <span className="md:text-base text-sm">{sport}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-4 border-t">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Experience</h2>

            <div className="flex justify-start items-center gap-4">
              <FiPlus
                className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
                onClick={() => setOpenExperienceAdd(true)}
              />
              <FiEdit3
                className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
                onClick={() => setOpenExperienceEdit(true)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {userData?.experience?.map((experience : any, index : number) => (
              <AthleteExperienceCard key={index} experience={experience} />
            ))}
          </div>
        </div>
        <div className="py-2 px-2 md:px-6 md:py-4   flex flex-col gap-2 border-t">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Certificates</h2>

            <div className="flex justify-start items-center gap-4">
              <FiPlus className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              <FiEdit3
                className="cursor-pointer h-5 w-5 md:h-6 md:w-6 text-gray-600"
              />
            </div>
          </div>

        </div>
      </div>

      {openDetailsEdit && (
        <div className="absolute">
          <BasicProfileEdit
            open={openDetailsEdit}
            setOpen={setOpenDetailsEdit}
            user={userData}
          />
        </div>
      )}

      {openAboutEdit && (
        <div className="absolute">
          <AboutProfileEdit
            open={openAboutEdit}
            setOpen={setOpenAboutEdit}
            user={userData}
          />
        </div>
      )}

      {openExperienceEdit && (
        <div className="absolute">
          <EditExperience
            open={openExperienceEdit}
            setOpen={setOpenExperienceEdit}
            user={userData}
          />
        </div>
      )}

      {openExperienceAdd && (
        <div className="absolute">
          <AddExperience
            open={openExperienceAdd}
            setOpen={setOpenExperienceAdd}
            user={userData}
          />
        </div>
      )}

      {
        openPostForm && (
          <div className="absolute">
            <PostForm
              open={openPostForm}
              setOpen={setOpenPostForm}
              user={userData}
            />
          </div>
        )
      }


      {
        openSportsEdit && (
          <div className="absolute">
            <SportsEdit
              open={openSportsEdit}
              setOpen={setOpenSportsEdit}
              user={userData}
            />
          </div>
        )
      }




    </div>
  );
};

export default Athlete;
