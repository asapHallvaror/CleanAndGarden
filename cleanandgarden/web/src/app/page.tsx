import Image from "next/image";
import Hero from "./components/Hero";
import Services from "./components/Services";
import LatestJobs from "./components/LatestJobs";
import Location from "./components/Location";

export default function Home() {
  return (
     <main>
      <Hero />
      <Services />
      <LatestJobs />
      <Location />
    </main>
  )
}
