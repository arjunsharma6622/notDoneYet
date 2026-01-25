"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FiAward } from "react-icons/fi";

interface Team {
  name: string;
  logo?: string;
  participants?: string[];
}

interface Match {
  matchNumber: number;
  roundNumber: number;
  team1?: Team | null;
  team2?: Team | null;
  winner?: Team | null;
  score?: {
    team1: number;
    team2: number;
  };
  scheduledDate?: Date;
  status: "pending" | "completed";
  _id?: string;
}

interface Round {
  roundNumber: number;
  roundName: string;
  matches: Match[];
}

interface Bracket {
  rounds: Round[];
  totalRounds: number;
  totalMatches: number;
}

interface TournamentBracketProps {
  bracket: Bracket;
  isOrganizer?: boolean;
  onMatchClick?: (match: Match) => void;
}

const MatchCard = ({
  match,
  isOrganizer,
  onClick,
}: {
  match: Match;
  isOrganizer?: boolean;
  onClick?: () => void;
}) => {
  const isCompleted = match.status === "completed";
  const hasWinner = !!match.winner;

  return (
    <div
      className={cn(
        "min-w-[220px] border-2 rounded-lg p-4 bg-white shadow-md transition-all relative z-10",
        isCompleted && "bg-green-50 border-green-300",
        onClick && "cursor-pointer hover:shadow-lg hover:scale-105"
      )}
      onClick={onClick}
    >
      <div className="text-xs text-gray-500 mb-2 font-medium">Match {match.matchNumber}</div>

      {/* Team 1 */}
      <div
        className={cn(
          "flex items-center gap-2 p-2.5 rounded mb-2 border",
          match.winner?.name === match.team1?.name && "bg-green-100 border-green-300 font-semibold",
          !match.team1 && "bg-gray-100 border-gray-200"
        )}
      >
        {match.team1?.logo && (
          <img
            src={match.team1.logo}
            alt={match.team1.name}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
        )}
        <span className="flex-1 text-sm font-medium">
          {match.team1?.name || "TBD"}
        </span>
        {match.score !== undefined && (
          <span className="font-bold text-base min-w-[24px] text-right">{match.score.team1}</span>
        )}
      </div>

      {/* VS */}
      <div className="text-center text-xs text-gray-500 py-1 font-semibold">VS</div>

      {/* Team 2 */}
      <div
        className={cn(
          "flex items-center gap-2 p-2.5 rounded border",
          match.winner?.name === match.team2?.name && "bg-green-100 border-green-300 font-semibold",
          !match.team2 && "bg-gray-100 border-gray-200"
        )}
      >
        {match.team2?.logo && (
          <img
            src={match.team2.logo}
            alt={match.team2.name}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
        )}
        <span className="flex-1 text-sm font-medium">
          {match.team2?.name || "TBD"}
        </span>
        {match.score !== undefined && (
          <span className="font-bold text-base min-w-[24px] text-right">{match.score.team2}</span>
        )}
      </div>

      {/* Winner badge for final */}
      {isCompleted && hasWinner && match.roundNumber === 1 && (
        <div className="mt-3 flex items-center justify-center gap-1 text-yellow-600 bg-yellow-50 py-1.5 rounded border border-yellow-200">
          <FiAward className="h-4 w-4" />
          <span className="text-xs font-bold">Champion</span>
        </div>
      )}
    </div>
  );
};

const TournamentBracket = ({
  bracket,
  isOrganizer = false,
  onMatchClick,
}: TournamentBracketProps) => {
  if (!bracket || !bracket.rounds || !Array.isArray(bracket.rounds) || bracket.rounds.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No bracket available. Generate bracket after adding teams.
      </div>
    );
  }

  // Calculate vertical positions for matches to create proper tree structure
  const calculateMatchPositions = (round: Round, roundIndex: number, allRounds: Round[]) => {
    const totalRounds = allRounds.length;
    const matchesInRound = round.matches.length;
    
    // Base spacing between matches
    const baseSpacing = 220;
    
    // Calculate spacing multiplier based on round (earlier rounds need more spacing)
    const spacingMultiplier = Math.pow(2, totalRounds - roundIndex - 1);
    const spacing = baseSpacing * spacingMultiplier;
    
    // Calculate total height needed
    const totalHeight = matchesInRound > 1 ? (matchesInRound - 1) * spacing : 0;
    
    // Calculate center offset to align with next round
    const centerOffset = totalHeight / 2;
    
    return round.matches.map((match, matchIndex) => {
      const position = matchIndex * spacing;
      return {
        match,
        position,
        matchIndex,
        spacing,
        totalHeight,
        centerOffset
      };
    });
  };

  return (
    <div className="w-full overflow-x-auto pb-8 bg-gray-50 -mx-4 px-4">
      {/* Desktop Bracket View */}
      <div className="hidden md:flex gap-20 min-w-max px-12 py-12 items-start">
        {bracket.rounds.map((round, roundIndex) => {
          const isLastRound = roundIndex === bracket.rounds.length - 1;
          const matchPositions = calculateMatchPositions(round, roundIndex, bracket.rounds);
          const maxHeight = Math.max(...matchPositions.map(m => m.totalHeight), 200);
          
          return (
            <div key={round.roundNumber} className="flex flex-col items-center relative">
              {/* Round Header */}
              <div className="text-center mb-8 sticky top-0 bg-gray-50 z-20 pb-4 w-full">
                <h3 className="text-2xl font-bold text-gray-800">{round.roundName}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {round.matches.length} match{round.matches.length !== 1 ? "es" : ""}
                </p>
              </div>

              {/* Matches Container */}
              <div 
                className="relative flex flex-col items-center"
                style={{ 
                  minHeight: `${maxHeight}px`,
                  width: '100%'
                }}
              >
                {matchPositions.map(({ match, position, matchIndex, spacing }) => {
                  const isEvenIndex = matchIndex % 2 === 0;
                  const hasPair = isEvenIndex && matchIndex + 1 < round.matches.length;
                  
                  return (
                    <div
                      key={match.matchNumber}
                      className="absolute flex items-center justify-center"
                      style={{
                        top: `${position}px`,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <MatchCard
                        match={match}
                        isOrganizer={isOrganizer}
                        onClick={
                          isOrganizer && match.status === "pending"
                            ? () => onMatchClick?.(match)
                            : undefined
                        }
                      />

                      {/* Connector lines to next round */}
                      {!isLastRound && (
                        <div 
                          className="absolute left-full flex items-center z-0"
                          style={{ 
                            width: '80px',
                            height: '100%',
                            top: '50%',
                            transform: 'translateY(-50%)'
                          }}
                        >
                          {/* Horizontal line from match center */}
                          <div className="w-12 h-1 bg-gray-400" />
                          
                          {/* Vertical connector for pairs */}
                          {hasPair && (
                            <>
                              {/* Vertical line connecting the pair */}
                              <div 
                                className="absolute left-12 w-1 bg-gray-400"
                                style={{
                                  height: `${spacing}px`,
                                  top: '50%',
                                  transform: 'translateY(-50%)'
                                }}
                              />
                              {/* Horizontal line to next round */}
                              <div 
                                className="absolute left-12 w-12 h-1 bg-gray-400"
                                style={{
                                  top: '50%',
                                  transform: 'translateY(-50%)'
                                }}
                              />
                            </>
                          )}
                          
                          {/* For odd-indexed matches (second of pair), just horizontal line */}
                          {!isEvenIndex && (
                            <div 
                              className="absolute left-12 w-12 h-1 bg-gray-400"
                              style={{
                                top: '50%',
                                transform: 'translateY(-50%)'
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile view - vertical layout */}
      <div className="md:hidden flex flex-col gap-8 py-4">
        {bracket.rounds.map((round, roundIndex) => (
          <div key={round.roundNumber} className="flex flex-col gap-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">{round.roundName}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {round.matches.length} match{round.matches.length !== 1 ? "es" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {round.matches.map((match) => (
                <MatchCard
                  key={match.matchNumber}
                  match={match}
                  isOrganizer={isOrganizer}
                  onClick={
                    isOrganizer && match.status === "pending"
                      ? () => onMatchClick?.(match)
                      : undefined
                  }
                />
              ))}
            </div>
            {roundIndex < bracket.rounds.length - 1 && (
              <div className="flex justify-center py-2">
                <div className="w-0.5 h-8 bg-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;
