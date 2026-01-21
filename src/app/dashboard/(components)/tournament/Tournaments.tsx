"use client";

import { IconButton } from "@/components/ui/IconButton";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
import LoadingModal from "../../(modals)/LoadingModal";

const CreateTournament = dynamic(
  () => import("../../(modals)/tournament/CreateTournament"),
  {
    loading: () => <LoadingModal />,
    ssr: false,
  }
);

const EditTournament = dynamic(
  () => import("../../(modals)/tournament/EditTournament"),
  {
    loading: () => <LoadingModal />,
    ssr: false,
  }
);

interface Tournament {
  _id: string;
  name: string;
  description?: string;
  sport: string;
  startDate: string;
  endDate: string;
  status: "draft" | "active" | "completed";
  teams: any[];
  bracket?: {
    rounds: any[];
    totalRounds: number;
    totalMatches: number;
  };
}

const Tournaments = ({ userData }: { userData: any }) => {
  const [openCreateTournament, setOpenCreateTournament] = useState(false);
  const [openEditTournament, setOpenEditTournament] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [fullTournamentData, setFullTournamentData] = useState<any>(null);
  const router = useRouter();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tournaments
  const fetchTournaments = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/tournament/organizer/my`);
      setTournaments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      toast.error("Failed to fetch tournaments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const handleDelete = async (tournamentId: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/tournament/${tournamentId}`);
      toast.success("Tournament deleted successfully");
      fetchTournaments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete tournament");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="py-2 px-2 md:px-6 md:py-4 flex flex-col gap-2 border-t">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Tournaments</h2>
          <IconButton
            variant={"addLong"}
            text="Create Tournament"
            onClick={() => setOpenCreateTournament(true)}
          />
        </div>

        {isLoading ? (
          <div className="text-gray-500 text-sm py-4">Loading tournaments...</div>
        ) : tournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1">
                    {tournament.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      tournament.status
                    )}`}
                  >
                    {tournament.status}
                  </span>
                </div>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">Sport:</span> {tournament.sport}
                  </p>
                  <p>
                    <span className="font-medium">Teams:</span> {tournament.teams.length}
                  </p>
                  <p>
                    <span className="font-medium">Start:</span> {formatDate(tournament.startDate)}
                  </p>
                  <p>
                    <span className="font-medium">End:</span> {formatDate(tournament.endDate)}
                  </p>
                  {tournament.bracket && (
                    <p>
                      <span className="font-medium">Bracket:</span> {tournament.bracket.totalRounds}{" "}
                      rounds, {tournament.bracket.totalMatches} matches
                    </p>
                  )}
                </div>

                {tournament.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {tournament.description}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => router.push(`/tournament/${tournament._id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm"
                  >
                    <FiEye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        // Fetch full tournament data for editing
                        const response = await axiosInstance.get(`/tournament/${tournament._id}`);
                        setFullTournamentData(response.data.data);
                        setSelectedTournament(tournament);
                        setOpenEditTournament(true);
                      } catch (error: any) {
                        toast.error("Failed to load tournament details");
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-500 text-sm"
                  >
                    <FiEdit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tournament._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-500 text-sm"
                  >
                    <FiTrash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm py-4">No tournaments created yet</p>
        )}
      </div>

      {openCreateTournament && (
        <div className="absolute">
          <CreateTournament
            user={userData}
            open={openCreateTournament}
            setOpen={setOpenCreateTournament}
            onSuccess={fetchTournaments}
          />
        </div>
      )}

      {openEditTournament && (fullTournamentData || selectedTournament) && (
        <div className="absolute">
          <EditTournament
            tournament={fullTournamentData || selectedTournament}
            open={openEditTournament}
            setOpen={setOpenEditTournament}
            onSuccess={() => {
              fetchTournaments();
              setSelectedTournament(null);
              setFullTournamentData(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Tournaments;
