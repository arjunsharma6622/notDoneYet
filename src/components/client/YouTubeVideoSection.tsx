"use client";

import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail, getYouTubeWatchUrl } from "@/utils/youtubeUtils";
import Image from "next/image";

interface YouTubeVideoSectionProps {
  videoIds: string[];
  autoplay?: boolean;
}

const YouTubeVideoSection = ({ videoIds, autoplay = false }: YouTubeVideoSectionProps) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(autoplay ? videoIds[0] : null);

  if (!videoIds || videoIds.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 w-full max-w-[650px]">
      {videoIds.map((videoId, index) => (
        <div key={index} className="relative w-full">
          {playingVideo === videoId ? (
            <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={`${getYouTubeEmbedUrl(videoId, true)}&controls=1&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={`YouTube video ${index + 1}`}
              />
              <a
                href={getYouTubeWatchUrl(videoId)}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors z-10"
                title="Watch on YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div
              className="relative w-full aspect-video cursor-pointer group rounded-md overflow-hidden bg-black"
              onClick={() => setPlayingVideo(videoId)}
            >
              <Image
                src={getYouTubeThumbnail(videoId)}
                alt="YouTube video thumbnail"
                fill
                className="object-cover"
                unoptimized
                sizes="(max-width: 768px) 100vw, 650px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-all">
                <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                YouTube
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default YouTubeVideoSection;
