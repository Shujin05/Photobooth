import Camera from "@/components/Camera";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-8">
      <h1 className="mb-8 text-5xl font-bold text-pink-500">
        Photo Booth
      </h1>

      <Camera />
    </main>
  );
}