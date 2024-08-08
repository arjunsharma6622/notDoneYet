import { IconButton } from '@/components/ui/IconButton';
import useFormSubmit from '@/hooks/useFormSubmit';
import dateFormat from "dateformat";


const EducationInfoCard = ({ education, userEducation, setUserEducation, setUserData, setSelectedEducation }: { education: any, userEducation: any, setUserEducation: any, setUserData: any, setSelectedEducation: any }) => {

    const { onSubmit: onDelete, isLoading: isDeleteLoading } = useFormSubmit('/user/', 'patch');

    const handleDeleteEducation = (education: any) => {
        const payloadToSend = {
            education: userEducation.filter(
                (edu: any) => edu._id !== education._id,
            )
        }
        onDelete(
            payloadToSend,
            (updatedData) => {
                setUserData((prev: any) => ({ ...prev, ...updatedData }));
                setUserEducation(updatedData.education);
            }
        )
    }
    return (
        <div
            className="px-6 py-2 w-full flex items-center justify-between gap-6 border rounded-md"
        >
            {education.school} . {education.degree} .{" "}
            {dateFormat(education.startDate, "mmmm, yyyy")} -{" "}
            {dateFormat(education.endDate, "mmmm, yyyy")}
            <div className="flex items-center justify-normal gap-4">
                <IconButton
                    variant={"edit"}
                    onClick={() => setSelectedEducation(education)}
                />
                <IconButton
                    variant={"delete"}
                    isLoading={isDeleteLoading}
                    onClick={() => handleDeleteEducation(education)}
                />
            </div>
        </div>)
}

export default EducationInfoCard