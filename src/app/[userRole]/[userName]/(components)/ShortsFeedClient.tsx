"use client";

import { Heart, MessageCircle, Share2, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ShortsFeedClient = ({ shorts, userData }: { shorts: any[]; userData: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);

  useEffect(() => {
    if (!isModalOpen || !containerRef.current) return;

    const observerOptions = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        const video = videoRefs.current[index];
        if (!video) return;

        if (entry.isIntersecting) {
          setPlayingIndex(index);
          video.play().catch(e => console.log("Auto-play prevented", e));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [shorts, isModalOpen]);

  // Scroll to selected video when modal opens
  useEffect(() => {
    if (isModalOpen && containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.clientHeight * initialScrollIndex;
        }
      }, 50);
    }
  }, [isModalOpen, initialScrollIndex]);

  // Pause all videos when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [isModalOpen]);

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlayingIndex(index);
    } else {
      video.pause();
      setPlayingIndex(-1);
    }
  };

  const openModal = (index: number) => {
    setInitialScrollIndex(index);
    setPlayingIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 border-t py-2 px-3 md:px-6 md:py-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Shorts Feed</h2>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {shorts.map((short, idx) => (
          <div 
            key={idx} 
            className="relative w-full aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform shadow-sm"
            onClick={() => openModal(idx)}
          >
            <video 
              src={`${short.url}#t=0.1`} 
              className="w-full h-full object-cover" 
              preload="metadata"
              muted 
              playsInline 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
              <span className="text-sm font-semibold flex items-center gap-1.5 drop-shadow-md">
                 <Play className="w-4 h-4 fill-white" /> {short.post?.views || Math.floor(Math.random() * 500) + 10}K views
              </span>
            </div>
            {/* Play icon overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-white fill-white opacity-90 drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm">
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-8 z-[60] bg-white/10 p-2.5 rounded-full hover:bg-white/20 text-white backdrop-blur-md transition-all shadow-lg" 
            onClick={() => setIsModalOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* The Scroll Container */}
          <div
            ref={containerRef}
            className="w-full max-w-[450px] mx-auto h-full sm:h-[90vh] overflow-y-scroll snap-y snap-mandatory bg-black sm:rounded-3xl border-none sm:border border-gray-800 shadow-2xl flex flex-col items-center relative"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {shorts.map((short, idx) => (
              <div
                key={idx}
                className="w-full h-full snap-start snap-always relative flex-shrink-0"
              >
                {/* Background Video */}
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  data-index={idx}
                  src={short.url}
                  className="w-full h-full object-cover cursor-pointer"
                  loop
                  playsInline
                  // Autoplay with sound might be blocked by browsers until user interaction.
                  onClick={() => togglePlay(idx)}
                />

                {/* Play Button Overlay */}
                {playingIndex !== idx && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="bg-black/40 rounded-full p-5 backdrop-blur-sm transition duration-300">
                      <Play className="w-14 h-14 text-white fill-white opacity-90" />
                    </div>
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Content Info */}
                <div className="absolute bottom-6 left-4 right-16 text-white flex flex-col gap-3 pointer-events-none">
                  <div className="flex items-center gap-3">
                    {userData?.image ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
                        <Image src={userData.image} alt={userData.name || "User"} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-white/50 flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold uppercase">{userData?.userName?.charAt(0) || "U"}</span>
                      </div>
                    )}
                    <span className="font-semibold text-[15px] drop-shadow-md">@{userData?.userName || "user"}</span>
                    <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md">Follow</span>
                  </div>
                  <p className="text-sm font-medium line-clamp-2 drop-shadow-md w-[90%] leading-relaxed">{short.post?.description}</p>
                </div>

                {/* Actions Sidebar */}
                <div className="absolute bottom-6 right-4 flex flex-col items-center gap-6 text-white">
                  <div className="flex flex-col items-center gap-1.5 group cursor-pointer pointer-events-auto">
                    <div className="p-3 bg-black/20 rounded-full backdrop-blur-md hover:bg-white/20 transition duration-300">
                      <Heart className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold drop-shadow-md">{short.post?.likes?.length || 0}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 group cursor-pointer pointer-events-auto">
                    <div className="p-3 bg-black/20 rounded-full backdrop-blur-md hover:bg-white/20 transition duration-300">
                      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold drop-shadow-md">{short.post?.comments?.length || 0}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 group cursor-pointer pointer-events-auto">
                    <div className="p-3 bg-black/20 rounded-full backdrop-blur-md hover:bg-white/20 transition duration-300">
                      <Share2 className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold drop-shadow-md">Share</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortsFeedClient;
