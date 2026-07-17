"use client";
import { RefObject } from "react";

interface StripProps {
    photos: string[];
    stripRef: RefObject<HTMLDivElement | null>;
}

export default function Strip({
  photos,
  stripRef
}: StripProps) {
  return (
    <div
        ref={stripRef}
        className="
        w-72
        rounded-3xl
        bg-white
        p-4
        shadow-2xl
        "
    >
      <div className="space-y-3">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="
              aspect-[3/4]
              w-full
              rounded-xl
              object-cover
            "
          />
        ))}
      </div>

      <div className="mt-4 text-center">

        <p className="text-sm text-gray-500">
          July 2026 ♡
        </p>
      </div>
    </div>
  );
}