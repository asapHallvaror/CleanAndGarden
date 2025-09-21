"use client";
import ServiceCard, { Service } from "./ServiceCard";

export default function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-8">
      {services.map((s, i) => (
        <ServiceCard key={s.id} service={s} imageRight={i % 2 === 1} />
      ))}
    </div>
  );
}
