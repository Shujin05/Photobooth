"use client";

import { useCamera } from "@/hooks/useCamera";

export default function Camera() {
  const {
    videoRef,
    startCamera,
    stopCamera,
    isStreaming,
    error,
  } = useCamera();

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="overflow-hidden rounded-3xl border-4 border-pink-200 shadow-xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-[480px] w-[360px] bg-pink-100 object-cover"
        />
      </div>

      {error && (
        <p className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {!isStreaming ? (
        <button
          onClick={startCamera}
          className="rounded-full bg-pink-500 px-6 py-3 font-medium text-white transition hover:scale-105 hover:bg-pink-600"
        >
          📸 Open Camera
        </button>
      ) : (
        <button
          onClick={stopCamera}
          className="rounded-full bg-gray-700 px-6 py-3 font-medium text-white transition hover:scale-105 hover:bg-gray-800"
        >
          Stop Camera
        </button>
      )}
    </div>
  );
}