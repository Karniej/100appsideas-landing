"use client";

import { useEffect, useRef } from "react";

interface MediaVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  playbackRate?: number;
}

export const MediaVideo = ({
  src,
  className = "",
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  objectFit = "contain",
  playbackRate = 1,
}: MediaVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = playbackRate;
      const handlePlay = () => {
        videoElement.playbackRate = playbackRate;
      };
      videoElement.addEventListener("play", handlePlay);
      return () => {
        videoElement.removeEventListener("play", handlePlay);
      };
    }
  }, [playbackRate]);

  return (
    <div
      className={`${className} ${
        className.includes("h-full") ? "relative w-full h-full" : ""
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        className={`w-full h-auto ${
          objectFit === "cover"
            ? "object-cover w-full h-full absolute inset-0"
            : ""
        }`}
        style={{ objectFit }}
      />
    </div>
  );
};
