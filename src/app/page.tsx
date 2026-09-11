import { Board } from "@/components/board/Board";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 max-w-7xl mx-auto h-screen flex flex-col">
      <Board />
    </main>
  );
}
