import React from 'react'
import dateFormat from 'dateformat'
import { IconButton } from '@/components/ui/IconButton'
import useFormSubmit from '@/hooks/useFormSubmit';

const AthleteExperienceInfoCard = ({ experience, setSelectedExperience, userExperience, setUserExperience, setUserData } : { experience: any, setSelectedExperience: any, userExperience: any, setUserExperience: any, setUserData: any}) => {

  const { onSubmit: onDelete, isLoading: isDeleteLoading } = useFormSubmit('/user/', 'patch');

  const handleDeleteExperience = (experience: any) => {
      const payloadToSend = {
          experience: userExperience.filter(
              (edu: any) => edu._id !== experience._id,
          )
      }
      onDelete(
          payloadToSend,
          (updatedData) => {
              setUserData((prev: any) => ({ ...prev, ...updatedData }));
              setUserExperience(updatedData.experience);
          }
      )
  }

  return (
    <div
    className="px-6 py-2 w-full flex items-center justify-between gap-6 border rounded-md"
  >
    {experience.title} . {experience.sport} .{" "}
    {dateFormat(experience.date, "mmmm, yyyy")}
    <div className="flex items-center justify-normal gap-4">
      <IconButton
        variant="edit"
        onClick={() => setSelectedExperience(experience)}
      />
      <IconButton
        variant="delete"
        isLoading={isDeleteLoading}
        onClick={() => handleDeleteExperience(experience)}
      />
    </div>
  </div>
    

)
}

export default AthleteExperienceInfoCard