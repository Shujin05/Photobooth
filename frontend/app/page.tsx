"use client";

import { useState } from "react";
import Camera from "@/components/Camera";
import { BoothState } from "@/types/photobooth";

export default function Home() {
  const [state, setState] = useState<BoothState>("idle");

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
        />
      )}

      {state === "preview" && (
        <div>
          Preview coming soon...
        </div>
      )}
    </main>
  );
}