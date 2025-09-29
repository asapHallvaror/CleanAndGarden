import Hero from "./components/landing/Hero";
import Services from "./components/landing/Services";
import LatestJobs from "./components/landing/LatestJobs";
import Location from "./components/landing/Location";

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
