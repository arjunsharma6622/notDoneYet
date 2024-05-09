import DoctorExperienceCard from "@/components/DoctorExperienceCard";
import dateFormat from "dateformat";
import { useState } from "react";
import { FiEdit3, FiPlus } from "react-icons/fi";
import ShowMoreText from "react-show-more-text";
import useSWR from "swr";
import AboutProfileEdit from "../(components)/AboutProfileEdit";
import BasicProfileEdit from "../(components)/BasicProfileEdit";
import ImageEdit from "../(components)/ImageEdit";
import PostForm from "../(components)/PostForm";
import AddEducation from "./(components)/AddEducation";
import AddExperience from "./(components)/AddExperience";
import EditEducation from "./(components)/EditEducation";
import EditExperience from "./(components)/EditExperience";
import EditSkills from "./(components)/EditSkills";
import ProfilePostCard from "../(components)/ProfilePostCard";

const Doctor = ({ userData } : any) => {
  const [openImagesEdit, setOpenImagesEdit] = useState(false);
  const [openExperienceAdd, setOpenExperienceAdd] = useState(false);
  const [openExperienceEdit, setOpenExperienceEdit] = useState(false);
  const [openPostForm, setOpenPostForm] = useState(false);
  const [openSkillsEdit, setOpenSkillsEdit] = useState(false);
  const [openEducationAdd, setOpenEducationAdd] = useState(false);
  const [openEducationEdit, setOpenEducationEdit] = useState(false);
  const [openDetailsEdit, setOpenDetailsEdit] = useState(false);
  const [openAboutEdit, setOpenAboutEdit] = useState(false);


  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: allUserPosts,
    error,
    isLoading,
  } = useSWR(`/api/posts/user/${userData?._id}`, fetcher);

  return (
    <div>
      <div className="flex flex-col rounded-md border">
        <div className="relative">
          <img
            src={
              userData?.backgroundImg ||
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
        <span className="text-xs">Doctor</span>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">{userData?.name}</h1>
              <div>
                <img
                  src="/images/doctorSymbol.png"
                  alt=""
                  className="w-8 h-8"
                />
              </div>
            </div>
            <FiEdit3
              className="cursor-pointer h-6 w-6 text-gray-600"
              onClick={() => setOpenDetailsEdit(true)}
            />
          </div>

          <h1>{userData?.bio}</h1>
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
            <ProfilePostCard key={post?._id} post={post} />
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

          <p>{userData?.about}</p>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Skills</h2>

            <div className="flex justify-start items-center gap-4">
              <FiEdit3
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenSkillsEdit(true)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {userData?.sports?.map((sport : any) => (
              <div key={sport} className="bg-gray-200 rounded-full px-4 py-1">
                <span className="">{sport}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Education</h2>

            <div className="flex justify-start items-center gap-4">
              <FiPlus
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenEducationAdd(true)}
              />
              <FiEdit3
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenEducationEdit(true)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {userData?.education?.map((education : any, index : any) => (
              <div key={index} className="flex flex-col gap-2">
                <div>
                  <h1 className="text-xl font-semibold">{education.school}</h1>
                  <span>{education.gpa}</span>
                  <p>{education.degree}</p>
                  <p>{education.fieldOfStudy}</p>
                </div>
                <div>
                  <span>{dateFormat(education.startDate, "mmmm, yyyy")}</span>
                  <span>-</span>
                  <span>{dateFormat(education.endDate, "mmmm, yyyy")}</span>
                </div>

                <div className="text-sm">
                  <p>{education.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 mt-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Experience</h2>

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
            {userData?.experience?.map((experience : any, index : any) => (
              <DoctorExperienceCard key={index} experience={experience} />
            ))}
          </div>
        </div>
        <div className="px-6 mt-10 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Certificates</h2>

            <div className="flex justify-start items-center gap-4">
              <FiPlus className="cursor-pointer h-6 w-6 text-gray-600" />
              <FiEdit3
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpenAboutEdit(true)}
              />
            </div>
          </div>

          <p>{userData?.about}</p>
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

      {openExperienceAdd && (
        <div className="absolute">
          <AddExperience
            open={openExperienceAdd}
            setOpen={setOpenExperienceAdd}
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

      {openEducationAdd && (
        <div className="absolute">
          <AddEducation
            open={openEducationAdd}
            setOpen={setOpenEducationAdd}
            user={userData}
          />
        </div>
      )}

      {openEducationEdit && (
        <div className="absolute">
          <EditEducation
            open={openEducationEdit}
            setOpen={setOpenEducationEdit}
            user={userData}
          />
        </div>
      )}

      {openPostForm && (
        <div className="absolute">
          <PostForm
            open={openPostForm}
            setOpen={setOpenPostForm}
            user={userData}
          />
        </div>
      )}

      {openSkillsEdit && (
        <div className="absolute">
          <EditSkills
            open={openSkillsEdit}
            setOpen={setOpenSkillsEdit}
            user={userData}
          />
        </div>
      )}

{openImagesEdit && (
        <div className="absolute">
          <ImageEdit
            open={openImagesEdit}
            setOpen={setOpenImagesEdit}
            user={userData}
          />
        </div>
      )}
    </div>
  );
};

export default Doctor;
