// src/components/landing/VideoPlayer.tsx
"use client";

import { useState, useRef } from "react";
import { PlayCircle } from "lucide-react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVideoPause = () => {
    // The 'controls' attribute can also trigger pause, so we sync state
    setIsPlaying(false);
  };

  return (
    <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-black">
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-brain-with-thinking-process-42994-large.mp4"
        poster="https://placehold.co/1280x720.png"
        data-ai-hint="digital brain"
        onPause={handleVideoPause}
        controls={isPlaying}
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
      />
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg cursor-pointer group"
          onClick={handlePlayClick}
        >
          <PlayCircle className="h-20 w-20 sm:h-24 sm:w-24 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          <span className="sr-only">Play Video</span>
        </div>
      )}
    </div>
  );
}
