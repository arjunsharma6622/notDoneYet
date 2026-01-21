"use client";

import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";
import { useEffect } from "react";

interface TournamentFormData {
  name: string;
  description: string;
  sport: string;
  startDate: string;
  endDate: string;
  location: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  maxTeams?: number;
  registrationDeadline?: string;
  status: "draft" | "active" | "completed";
}

const EditTournament = ({
  open,
  setOpen,
  tournament,
  onSuccess,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  tournament: any;
  onSuccess?: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TournamentFormData>({
    defaultValues: {
      name: "",
      description: "",
      sport: "",
      startDate: "",
      endDate: "",
      location: {},
      maxTeams: undefined,
      registrationDeadline: undefined,
      status: "draft",
    },
  });

  // Populate form when tournament data is available
  useEffect(() => {
    if (tournament && open) {
      const formatDateForInput = (dateString: string) => {
        if (!dateString) return "";
        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return "";
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch (e) {
          return "";
        }
      };

      reset({
        name: tournament.name || "",
        description: tournament.description || "",
        sport: tournament.sport || "",
        startDate: formatDateForInput(tournament.startDate),
        endDate: formatDateForInput(tournament.endDate),
        location: {
          address: tournament.location?.address || "",
          city: tournament.location?.city || "",
          state: tournament.location?.state || "",
          country: tournament.location?.country || "",
        },
        maxTeams: tournament.maxTeams || undefined,
        registrationDeadline: tournament.registrationDeadline
          ? formatDateForInput(tournament.registrationDeadline)
          : undefined,
        status: tournament.status || "draft",
      });
    }
  }, [tournament, open, reset]);

  const { onSubmit, isLoading } = useFormSubmit(
    `/tournament/${tournament?._id}`,
    "patch"
  );

  const handleFormSubmit = async (data: TournamentFormData) => {
    onSubmit(
      {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        registrationDeadline: data.registrationDeadline
          ? new Date(data.registrationDeadline).toISOString()
          : undefined,
      },
      (updatedData: any) => {
        toast.success("Tournament updated successfully");
        setOpen(false);
        if (onSuccess) onSuccess();
      }
    );
  };

  if (!tournament) return null;

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[60%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Edit Tournament</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setOpen(false)}
              />
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-6 overflow-scroll"
            >
              <div className="overflow-y-scroll px-6 flex flex-col gap-6">
                {/* Basic Information */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold underline">Basic Information</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tournament Name *
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Tournament name is required" })}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      placeholder="Enter tournament name"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      placeholder="Enter tournament description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sport *
                    </label>
                    <input
                      type="text"
                      {...register("sport", { required: "Sport is required" })}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      placeholder="e.g., Basketball, Football, Tennis"
                    />
                    {errors.sport && (
                      <span className="text-red-500 text-sm">{errors.sport.message}</span>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold underline">Dates</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="datetime-local"
                        {...register("startDate", { required: "Start date is required" })}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      />
                      {errors.startDate && (
                        <span className="text-red-500 text-sm">{errors.startDate.message}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date *
                      </label>
                      <input
                        type="datetime-local"
                        {...register("endDate", { required: "End date is required" })}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      />
                      {errors.endDate && (
                        <span className="text-red-500 text-sm">{errors.endDate.message}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Deadline
                    </label>
                    <input
                      type="datetime-local"
                      {...register("registrationDeadline")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold underline">Location</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      {...register("location.address")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        {...register("location.city")}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        {...register("location.state")}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        {...register("location.country")}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-semibold underline">Settings</h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Teams (optional)
                    </label>
                    <input
                      type="number"
                      {...register("maxTeams", { valueAsNumber: true })}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                      placeholder="Maximum number of teams"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      {...register("status")}
                      className="border rounded-md px-3 py-2 w-full focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Teams Info (Read-only) */}
                {tournament.teams && tournament.teams.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold underline">Teams</h2>
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{tournament.teams.length}</span> team
                        {tournament.teams.length !== 1 ? "s" : ""} registered
                      </p>
                      <p className="text-xs text-gray-500">
                        Teams cannot be edited here. Use the tournament detail page to manage teams.
                      </p>
                    </div>
                  </div>
                )}
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

export default EditTournament;
