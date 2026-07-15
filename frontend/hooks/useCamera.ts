"use client";

import { useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsStreaming(true);
      setError(null);
    } catch (err) {
      setError("Unable to access camera.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (!streamRef.current) return;

    streamRef.current.getTracks().forEach((track) => track.stop());

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
  };

  return {
    videoRef,
    startCamera,
    stopCamera,
    isStreaming,
    error,
  };
}