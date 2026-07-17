"use client";

import { useRef, useState } from "react";
import Camera from "@/components/Camera";
import { BoothState } from "@/types/photobooth";
import Strip from "@/components/Strip";
import { exportStrip } from "@/lib/export";


export default function Home() {
  const [state, setState] = useState<BoothState>("idle");
  const [photos, setPhotos] = useState<string[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-50">
      {state === "idle" && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold text-pink-500">
            Photo Booth 
          </h1>

          <button
            onClick={() => setState("camera")}
            className="rounded-full bg-pink-500 px-6 py-3 text-white"
          >
            📸 Start
          </button>
        </div>
      )}

      {state === "camera" && (
        <Camera
          state={state}
          setState={setState}
          photos={photos}
          setPhotos={setPhotos}
        />
      )}

      {state === "preview" && (
        <div>
          <Strip
              photos={photos}
              stripRef={stripRef}
          />
          <button
            onClick={() => {
                if (!stripRef.current) return;

                exportStrip(stripRef.current);
            }}
        >
            Download PNG
        </button>
        </div>
      )}
    </main>
  );
}