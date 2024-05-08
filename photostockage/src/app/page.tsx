import Image from "next/image"
import { Polaroid } from "./components/Polaroid"
import { Hero } from "./components/Hero"

export default function Home() {
  return (
    <>
    <Hero />
    <main className="min-h-[100vh]">
      <Polaroid />
    </main>
    </>
    
  );
}
