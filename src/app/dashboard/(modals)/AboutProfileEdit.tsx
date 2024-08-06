import ModalLayout from "@/components/ModalLayout";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";

const AboutProfileEdit = ({
  user,
  open,
  setOpen,
}: {
  user: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: user,
  });

  const onSubmit = async (data: any) => {
    try {
      await axiosInstance.patch(`/user/`, data);
      toast.success("Profile Updated");
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

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
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="flex flex-col gap-2 px-6">
                <h2 className="text-xl font-semibold underline">About</h2>
                <textarea
                  id=""
                  cols={30}
                  rows={4}
                  placeholder="Add something about yourself"
                  className="border rounded-md focus:outline-none p-3"
                  {...register("about", { required: true })}
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
                <Button
                  variant="destructive"
                  className="px-6  py-2 rounded-sm font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 bg-primary py-2 rounded-sm font-semibold"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default AboutProfileEdit;
