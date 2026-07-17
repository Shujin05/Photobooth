"use client";

import { useCamera } from "@/hooks/useCamera";
import { capturePhoto } from "@/hooks/useCapture";
import { BoothState } from "@/types/photobooth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Countdown from "./Countdown";
import { useCountdown } from "@/hooks/useCountdown";

interface CameraProps {
  state: BoothState;
  setState: Dispatch<SetStateAction<BoothState>>;
  photos: string[];
  setPhotos: Dispatch<SetStateAction<string[]>>;
}

export default function Camera({
  state,
  setState,
  photos,
  setPhotos
}: CameraProps) {
  
  const {
    videoRef,
    startCamera,
    stopCamera,
    isStreaming,
    error,
  } = useCamera();

  const {
    count,
    isCountingDown,
    startCountdown,
  } = useCountdown({
    onComplete: () => {
      const image = capturePhoto(videoRef.current);

      if (!image) return;

      setPhotos((prev) => [...prev, image]);
    },
  });

  useEffect(() => {
    if (photos.length === 4) {
      setState("preview");
    }
  }, [photos, setState]);


  return (
    <div className="flex flex-col items-center gap-6">

      {/* Camera Preview */}
      <div className="overflow-hidden rounded-3xl border-4 border-pink-200 shadow-xl">

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="
            h-[480px]
            w-[360px]
            object-cover
            scale-x-[-1]
          "
        />

        <Countdown count={count} />

      </div>


      {/* Error */}
      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}


      {/* Camera Controls */}
      {!isStreaming ? (

        <button
          onClick={startCamera}
          className="
            rounded-full
            bg-pink-500
            px-6
            py-3
            text-white
            hover:bg-pink-600
          "
        >
          📸 Open Camera
        </button>

      ) : (

        <div className="flex gap-4">

          <button
            onClick={startCountdown}
            disabled={photos.length >= 4 || isCountingDown}
            className="
                rounded-full
                bg-pink-500
                px-6
                py-3
                text-white
                disabled:bg-gray-300
            "
            >
            {photos.length < 4
                ? `Take Photo ${photos.length + 1}/4 📸`
                : "Completed ✨"}
            </button>



          <button
            onClick={stopCamera}
            className="
              rounded-full
              bg-gray-700
              px-6
              py-3
              text-white
            "
          >
            Stop
          </button>

          <div className="flex gap-3">
            {photos.map((photo, index) => (
                <img
                key={index}
                src={photo}
                alt={`Photo ${index + 1}`}
                className="
                    h-20
                    w-16
                    rounded-lg
                    object-cover
                "
                />
            ))}
            </div>

        </div>

      )}

    </div>
  );
}