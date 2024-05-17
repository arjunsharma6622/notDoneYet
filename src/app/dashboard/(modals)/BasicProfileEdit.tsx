import { updateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";

const BasicProfileEdit = ({
  user,
  open,
  setOpen,
}: {
  user: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: user,
  });

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("bio", user.bio);
    setValue("address.street", user.address?.street);
    setValue("address.city", user.address?.city);
    setValue("address.state", user.address?.state);
    setValue("address.country", user.address?.country);
    setValue("address.postalCode", user.address?.postalCode);
  }, [user, setValue]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      await updateUser(data);
      toast.success("Profile Updated");
      setOpen(false);
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {open && (
        <div className="z-[40] fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm">
          <div className="w-[95%] md:w-[55%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="overflow-y-scroll px-6 flex flex-col gap-6">

                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Basic Details
                  </h2>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        Name is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: true })}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        Email is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      {...register("phone")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">
                    Bio/Headling
                  </h2>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <input
                      type="text"
                      id="bio"
                      {...register("bio")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold underline">Location</h2>
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street
                    </label>
                    <input
                      type="text"
                      id="street"
                      {...register("address.street")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-4 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        {...register("address.city")}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        {...register("address.state")}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      />
                    </div>
                  </div>


                  <div className="flex gap-4 w-full">

                  <div className="w-full">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      {...register("address.country")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <input
                      type="number"
                      id="postalCode"
                      {...register("address.postalCode")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-3">
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
        </div>
      )}
    </div>
  );
};

export default BasicProfileEdit;
