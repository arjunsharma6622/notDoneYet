"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiX, FiCalendar, FiMapPin, FiUsers, FiAward, FiEdit } from "react-icons/fi";
import TournamentBracket from "@/components/tournament/TournamentBracket";
import ModalLayout from "@/components/ModalLayout";
import { FormButton } from "@/components/ui/FormButton";
import { API_HEAD } from "@/lib/utils";
import axiosInstance from "@/utils/axiosInstance";
import useAuth from "@/context/useAuth";
import dynamic from "next/dynamic";

const EditTournament = dynamic(
  () => import("@/app/dashboard/(modals)/tournament/EditTournament"),
  { ssr: false }
);

interface Match {
  matchNumber: number;
  roundNumber: number;
  team1?: any;
  team2?: any;
  winner?: any;
  score?: {
    team1: number;
    team2: number;
  };
  status: "pending" | "completed";
  _id?: string;
}

const TournamentDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const authContext = useAuth();
  const auth = authContext || { user: null };
  const tournamentId = params?.id as string;
  const [tournament, setTournament] = useState<any>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isUpdatingMatch, setIsUpdatingMatch] = useState(false);
  const [isGeneratingBracket, setIsGeneratingBracket] = useState(false);
  const [openEditTournament, setOpenEditTournament] = useState(false);
  const [matchResult, setMatchResult] = useState({
    winnerIndex: 1,
    score: { team1: 0, team2: 0 },
  });

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await axiosInstance.get(`/tournament/${tournamentId}`);
        setTournament(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch tournament");
        router.push("/dashboard");
      }
    };

    if (tournamentId) {
      fetchTournament();
    }
  }, [tournamentId, router]);

  const isOrganizer =
    auth?.user &&
    tournament &&
    tournament.organizer &&
    (tournament.organizer._id === auth.user._id ||
      tournament.organizer.toString() === auth.user._id ||
      (typeof tournament.organizer === 'string' && tournament.organizer === auth.user._id) ||
      (typeof tournament.organizer === 'object' && tournament.organizer._id?.toString() === auth.user._id?.toString()));

  const handleMatchClick = (match: Match) => {
    if (isOrganizer && match.status === "pending") {
      setSelectedMatch(match);
      setMatchResult({
        winnerIndex: match.team1 ? 1 : 2,
        score: match.score || { team1: 0, team2: 0 },
      });
    }
  };

  const handleGenerateBracket = async () => {
    if (!tournamentId) return;

    if (!tournament.teams || tournament.teams.length === 0) {
      toast.error("Please add teams first");
      return;
    }

    if (tournament.teams.length % 2 !== 0) {
      toast.error("Number of teams must be even to generate bracket");
      return;
    }

    setIsGeneratingBracket(true);
    try {
      await axiosInstance.post(`/tournament/${tournamentId}/generateBracket`);
      toast.success("Bracket generated successfully");
      
      // Refresh tournament data
      const response = await axiosInstance.get(`/tournament/${tournamentId}`);
      setTournament(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to generate bracket");
    } finally {
      setIsGeneratingBracket(false);
    }
  };

  const handleUpdateMatchResult = async () => {
    if (!selectedMatch) return;

    setIsUpdatingMatch(true);
    try {
      const matchId = selectedMatch._id || selectedMatch.matchNumber.toString();
      await axiosInstance.patch(`/tournament/${tournamentId}/match/${matchId}`, {
        winnerIndex: matchResult.winnerIndex,
        score: matchResult.score,
      });

      toast.success("Match result updated successfully");
      setSelectedMatch(null);

      // Refresh tournament data
      const response = await axiosInstance.get(`/tournament/${tournamentId}`);
      setTournament(response.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update match result");
    } finally {
      setIsUpdatingMatch(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!tournament) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading tournament...</div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="md:w-[95%] flex flex-col items-start mt-5 gap-6">
        {/* Tournament Header */}
        <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{tournament.name}</h1>
              {tournament.description && (
                <p className="text-gray-600 mb-4">{tournament.description}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {isOrganizer && (
                <button
                  onClick={() => setOpenEditTournament(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 text-sm font-medium"
                >
                  <FiEdit className="h-4 w-4" />
                  Edit
                </button>
              )}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tournament.status === "draft"
                    ? "bg-gray-100 text-gray-800"
                    : tournament.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {tournament.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <FiAward className="h-5 w-5" />
              <span className="font-medium">{tournament.sport}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiUsers className="h-5 w-5" />
              <span>
                {tournament.teams?.length || 0} team{(tournament.teams?.length || 0) !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FiCalendar className="h-5 w-5" />
              <span>{formatDate(tournament.startDate)}</span>
            </div>
            {tournament.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <FiMapPin className="h-5 w-5" />
                <span>
                  {tournament.location.city || tournament.location.address || "TBD"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bracket Section */}
        {tournament.bracket && tournament.bracket.rounds && Array.isArray(tournament.bracket.rounds) && tournament.bracket.rounds.length > 0 ? (
          <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tournament Bracket</h2>
            <TournamentBracket
              bracket={tournament.bracket}
              isOrganizer={isOrganizer || false}
              onMatchClick={handleMatchClick}
            />
          </div>
        ) : (
          <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <p className="text-gray-500 text-center">
                Bracket not generated yet. {tournament.teams?.length > 0 
                  ? `You have ${tournament.teams.length} team${tournament.teams.length !== 1 ? 's' : ''}.`
                  : 'Add teams to generate bracket.'}
              </p>
              {isOrganizer && tournament.teams && tournament.teams.length > 0 && (
                <>
                  {tournament.teams.length % 2 === 0 ? (
                    <button
                      onClick={handleGenerateBracket}
                      disabled={isGeneratingBracket}
                      className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      {isGeneratingBracket ? "Generating Bracket..." : "Generate Bracket"}
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className="text-red-600 text-sm mb-2">
                        You need an even number of teams to generate bracket.
                      </p>
                      <p className="text-gray-500 text-sm">
                        Currently have {tournament.teams.length} team{tournament.teams.length !== 1 ? 's' : ''}. 
                        {tournament.teams.length < 2 ? ' Add at least 2 teams.' : ` Add ${tournament.teams.length % 2} more team${tournament.teams.length % 2 !== 1 ? 's' : ''} or remove ${tournament.teams.length % 2} team${tournament.teams.length % 2 !== 1 ? 's' : ''}.`}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Teams List */}
        {tournament.teams && tournament.teams.length > 0 && (
          <div className="w-full border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournament.teams.map((team: any, index: number) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    {team.logo && (
                      <img
                        src={team.logo}
                        alt={team.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">{team.name}</h3>
                      {team.participants && team.participants.length > 0 && (
                        <p className="text-sm text-gray-500">
                          {team.participants.length} participant
                          {team.participants.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Match Result Update Modal */}
      {selectedMatch && (
        <ModalLayout>
          <div className="w-[95%] md:w-[500px] bg-white rounded-md flex flex-col gap-4">
            <div className="flex items-center justify-between border-b px-6 py-5">
              <h1 className="text-2xl font-bold">Update Match Result</h1>
              <FiX
                className="cursor-pointer h-6 w-6 text-gray-600"
                onClick={() => setSelectedMatch(null)}
              />
            </div>

            <div className="px-6 flex flex-col gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{selectedMatch.team1?.name}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={matchResult.score.team1}
                    onChange={(e) =>
                      setMatchResult({
                        ...matchResult,
                        score: {
                          ...matchResult.score,
                          team1: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-16 px-2 py-1 border rounded text-center"
                  />
                </div>
                <div className="text-center text-gray-400 py-2">VS</div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{selectedMatch.team2?.name}</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={matchResult.score.team2}
                    onChange={(e) =>
                      setMatchResult({
                        ...matchResult,
                        score: {
                          ...matchResult.score,
                          team2: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-16 px-2 py-1 border rounded text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Winner
                </label>
                <select
                  value={matchResult.winnerIndex}
                  onChange={(e) =>
                    setMatchResult({
                      ...matchResult,
                      winnerIndex: parseInt(e.target.value),
                    })
                  }
                  className="border rounded-md px-3 py-2 w-full focus:outline-none"
                >
                  <option value={1}>{selectedMatch.team1?.name}</option>
                  <option value={2}>{selectedMatch.team2?.name}</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 border-t px-6 py-4">
              <FormButton
                onClick={() => setSelectedMatch(null)}
                variant={"cancel"}
              />
              <FormButton
                onClick={handleUpdateMatchResult}
                variant={"save"}
                isLoading={isUpdatingMatch}
              />
            </div>
          </div>
        </ModalLayout>
      )}

      {/* Edit Tournament Modal */}
      {openEditTournament && tournament && (
        <EditTournament
          tournament={tournament}
          open={openEditTournament}
          setOpen={setOpenEditTournament}
          onSuccess={() => {
            // Refresh tournament data
            const fetchTournament = async () => {
              try {
                const response = await axiosInstance.get(`/tournament/${tournamentId}`);
                setTournament(response.data.data);
              } catch (error: any) {
                toast.error(error.response?.data?.message || "Failed to fetch tournament");
              }
            };
            fetchTournament();
          }}
        />
      )}
    </div>
  );
};

export default TournamentDetailPage;
