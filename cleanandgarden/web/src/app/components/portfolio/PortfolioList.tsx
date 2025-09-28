"use client";
import PortafolioCard, { Trabajo } from "./PortfolioCard";

export default function PortafolioList({ trabajos }: { trabajos: Trabajo[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {trabajos.map((t) => (
        <PortafolioCard key={t.id} trabajo={t} />
      ))}
    </div>
  );
}
