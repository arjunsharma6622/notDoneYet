import PastEventCard from "@/components/PastEventCard";
import VenueCard from "@/components/VenueCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import ShowMoreText from "react-show-more-text";
import AboutProfileEdit from "../(components)/AboutProfileEdit";
import PostForm from "../(components)/PostForm";
import AddVenue from "./(components)/AddVenue";
import BasicProfileEdit from "./(components)/BasicDetails";
import EditVenue from "./(components)/EditVenue";
import useSWR from "swr";


const VenueOwner = ({allUserPosts, userData} : any) => {
    const [openImagesEdit, setOpenImagesEdit] = useState(false);
    const [openPostForm, setOpenPostForm] = useState(false);
    const [openAboutEdit, setOpenAboutEdit] = useState(false);
    const [openDetailsEdit, setOpenDetailsEdit] = useState(false);
    const [openAddVenue, setOpenAddVenue] = useState(false);
    const [openEditVenue, setOpenEditVenue] = useState(false);
    const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
    const [openExperienceEdit, setOpenExperienceEdit] = useState(false);



    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data : allVenues, error, isLoading } = useSWR(`/api/venue/user/${userData?._id}`, fetcher)


  return (
    <div>
      <div className="flex flex-col rounded-md border">
        <div className="relative">
          <img
            src={
              "https://www.fr.com/images/demo/fish-richardson-header-default.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            className="w-full object-cover aspect-[4/1] rounded-tr-md rounded-tl-md"
          />
          <img
            src={
              userData?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            referrerPolicy="no-referrer"
            alt=""
            className="absolute left-6 -bottom-10 border-white border-8 w-44 h-44 object-cover rounded-full"
          />

          <div className="text-gray-600 absolute right-6 top-6 bg-white cursor-pointer rounded-full p-[6px]">
            <FiEdit3
              className="h-5 w-5"
              onClick={() => setOpenImagesEdit(true)}
            />
          </div>
        </div>

        <div className="px-6 mt-10 flex flex-col">
        <span className="text-xs">Venues</span>

          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{userData?.name}</h1>
            <GrMapLocation className="cursor-pointer h-6 w-6" />
            </div>
            <FiEdit3
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpenDetailsEdit(true)}
            />
          </div>


          <h1>{userData.bio}</h1>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Venues</h2>

            <div className="flex justify-start items-center gap-4">
              <FiPlus
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenAddVenue(true)}
              />
              <FiEdit3
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenEditVenue(true)}
              />
            </div>
          </div>
          {allVenues?.map((venue : any) => (
            <VenueCard venueDetails={venue} key={venue._id}/>
          ))}
          </div>


        <div className="px-6 mt-10 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-xl font-bold">Posts</h2>
          </div>

          <div
            className="flex cursor-pointer text-sm justify-start w-fit bg-gray-200 rounded-full px-4 py-1 items-center gap-2"
            onClick={() => setOpenPostForm(true)}
          >
            <FiPlus className="cursor-pointer h-6 w-6 text-gray-600" />
            <span>Add New Post</span>
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

        <div className="px-6 mt-10 flex flex-col gap-2">
          <div className="flex justify-between items-center gap-1">
            <h2 className="text-xl font-bold">About</h2>
            <FiEdit3
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpenAboutEdit(true)}
            />
          </div>

          <p>{userData.about}</p>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Previous Events</h2>

            <div className="flex justify-start items-center gap-4">
              <FiPlus
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenExperienceAdd(true)}
              />
              <FiEdit3
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenExperienceEdit(true)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {userData.events?.map((event : any, index : number) => (
              <PastEventCard key={index} eventDetails={event}/>
            ))}
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

      {openAddVenue && (
        <div className="absolute">
          <AddVenue
            open={openAddVenue}
            setOpen={setOpenAddVenue}
            user={userData}
            
          />
        </div>
      )}


{openEditVenue && (
  <div className="absolute">
    <EditVenue
      open={openEditVenue}
      setOpen={setOpenEditVenue}
      user={userData}
      allVenues={allVenues}
    />
  </div>
)}


    </div>
  );
};

export default VenueOwner;
