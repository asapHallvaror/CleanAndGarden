"use client";
import Image from "next/image";

export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;   // URL pública (CDN, Supabase, S3) o /public/...
};

export default function ServiceCard({
  service,
  imageRight = false,
}: { service: Service; imageRight?: boolean }) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">
      {/* Imagen */}
      <figure className={`lg:w-1/3 ${imageRight ? "lg:order-2" : ""}`}>
        {/* Usa <img> si la URL es remota sin configurar next.config */}
        <Image
          src={service.imageUrl}
          alt={service.title}
          width={640}
          height={420}
          className="h-full w-full object-cover"
        />
      </figure>

      {/* Texto */}
      <div className="card-body lg:w-2/3">
        <h3 className="card-title text-[#2E5430]">{service.title}</h3>
        <p className="text-gray-700">{service.description}</p>
      </div>
    </div>
  );
}
