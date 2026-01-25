"use client";

import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import useFormSubmit from "@/hooks/useFormSubmit";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { useState } from "react";

interface Team {
  name: string;
  logo?: string;
  participants?: string[];
}

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
  teams: Team[];
  maxTeams?: number;
  registrationDeadline?: string;
}

const CreateTournament = ({
  open,
  setOpen,
  user,
  onSuccess,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: any;
  onSuccess?: () => void;
}) => {
  const [isGeneratingBracket, setIsGeneratingBracket] = useState(false);
  const [tournamentId, setTournamentId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<TournamentFormData>({
    defaultValues: {
      name: "",
      description: "",
      sport: "",
      startDate: "",
      endDate: "",
      location: {},
      teams: [],
      maxTeams: undefined,
      registrationDeadline: undefined,
    },
  });

  const { fields: teamFields, append: appendTeam, remove: removeTeam } = useFieldArray({
    control,
    name: "teams",
  });

  const { onSubmit, isLoading } = useFormSubmit("/tournament/", "post");

  const handleFormSubmit = async (data: TournamentFormData) => {
    // Validate even number of teams
    if (data.teams.length === 0) {
      toast.error("Please add at least one team");
      return;
    }

    if (data.teams.length % 2 !== 0) {
      toast.error("Number of teams must be even to generate bracket");
      return;
    }

    onSubmit(
      {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        registrationDeadline: data.registrationDeadline
          ? new Date(data.registrationDeadline).toISOString()
          : undefined,
      },
      (responseData: any) => {
        setTournamentId(responseData._id);
        toast.success("Tournament created successfully");
        // Don't reset teams so generate bracket button can show
        // reset();
        if (onSuccess) onSuccess();
      }
    );
  };

  const handleGenerateBracket = async () => {
    if (!tournamentId) {
      toast.error("Please create tournament first");
      return;
    }

    const teams = watch("teams");
    if (teams.length === 0) {
      toast.error("Please add teams first");
      return;
    }

    if (teams.length % 2 !== 0) {
      toast.error("Number of teams must be even to generate bracket");
      return;
    }

    setIsGeneratingBracket(true);
    try {
      const response = await axiosInstance.post(`/tournament/${tournamentId}/generateBracket`);
      toast.success("Bracket generated successfully");
      setOpen(false);
      reset();
      setTournamentId(null);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to generate bracket");
    } finally {
      setIsGeneratingBracket(false);
    }
  };

  const handleAddTeam = () => {
    appendTeam({ name: "", logo: "", participants: [] });
  };

  const teams = watch("teams");
  const canGenerateBracket = teams.length > 0 && teams.length % 2 === 0 && tournamentId;

  return (
    <div>
      {open && (
        <ModalLayout>
          <div className="w-[95%] md:w-[60%] max-h-[90%] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Create Tournament</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => {
                  setOpen(false);
                  reset();
                  setTournamentId(null);
                }}
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

                {/* Teams */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold underline">Teams</h2>
                    <button
                      type="button"
                      onClick={handleAddTeam}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    >
                      <FiPlus className="h-4 w-4" />
                      Add Team
                    </button>
                  </div>

                  {teamFields.length === 0 ? (
                    <p className="text-gray-500 text-sm">No teams added yet</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {teamFields.map((field, index) => (
                        <div key={field.id} className="flex items-start gap-3 border p-3 rounded-md">
                          <div className="flex-1 flex flex-col gap-2">
                            <input
                              type="text"
                              {...register(`teams.${index}.name` as const, {
                                required: "Team name is required",
                              })}
                              className="border rounded-md px-3 py-2 w-full focus:outline-none"
                              placeholder="Team name"
                            />
                            <input
                              type="text"
                              {...register(`teams.${index}.logo` as const)}
                              className="border rounded-md px-3 py-2 w-full focus:outline-none"
                              placeholder="Team logo URL (optional)"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTeam(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {teams.length > 0 && (
                    <div className="text-sm">
                      <p className={teams.length % 2 === 0 ? "text-green-600" : "text-red-600"}>
                        {teams.length} team{teams.length !== 1 ? "s" : ""} added
                        {teams.length % 2 !== 0 && " (must be even number)"}
                      </p>
                    </div>
                  )}

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
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
                <FormButton onClick={() => {
                  setOpen(false);
                  reset();
                  setTournamentId(null);
                }} variant={"cancel"} />
                {tournamentId && canGenerateBracket ? (
                  <button
                    type="button"
                    onClick={handleGenerateBracket}
                    disabled={isGeneratingBracket}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingBracket ? "Generating..." : "Generate Bracket"}
                  </button>
                ) : (
                  <FormButton type="submit" variant={"save"} isLoading={isLoading} />
                )}
              </div>
            </form>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default CreateTournament;
