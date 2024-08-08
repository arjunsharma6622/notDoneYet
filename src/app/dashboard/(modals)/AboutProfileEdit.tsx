import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

const AboutProfileEdit = ({
  user,
  setUserData,
  open,
  setOpen,
}: {
  user: any;
  setUserData: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: user,
  });

  const { onSubmit, isLoading } = useFormSubmit('/user/', 'patch')

  const handleFormSubmit = (data: any) => {
    const payloadToSend = {
      about: data.about
    }

    onSubmit(payloadToSend, (updatedData) => {
      setUserData((prev: any) => ({ ...prev, ...updatedData }));
      setOpen(false);
    })
  }

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Edit About</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="flex flex-col gap-2 px-6">
                <h2 className="text-xl font-semibold underline">About</h2>
                <textarea
                  id=""
                  cols={30}
                  rows={10}
                  placeholder="Add something about yourself"
                  className="border rounded-md focus:outline-none p-3"
                  {...register("about", { required: true })}
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
                <FormButton onClick={() => setOpen(false)} variant={"cancel"} />
                <FormButton type="submit" variant={"save"} isLoading={isLoading} />
              </div>
            </form>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default AboutProfileEdit;
