interface CountdownProps {
  count: number | null;
}

export default function Countdown({
  count,
}: CountdownProps) {
  if (count === null) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <h1 className="text-8xl font-bold text-white animate-pulse">
        {count}
      </h1>
    </div>
  );
}