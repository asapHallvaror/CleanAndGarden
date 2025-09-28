"use client";
import Image from "next/image";

export type Service = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;   // URL pública (CDN, Supabase, S3) o /public/...
  duracion?: number;  // Duración en minutos
  precio?: number;    // Precio en CLP
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
        <p className="text-gray-700 mb-4">{service.description}</p>
        
        {/* Información adicional */}
        <div className="flex flex-wrap gap-4 mb-4">
          {service.duracion && service.duracion > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{Math.floor(service.duracion / 60)}h {service.duracion % 60}min</span>
            </div>
          )}
          {service.precio && service.precio > 0 && (
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2E5430]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z" clipRule="evenodd" />
              </svg>
              <span>Desde ${service.precio.toLocaleString('es-CL')} CLP</span>
            </div>
          )}
        </div>
        
        <div className="card-actions justify-end">
          <button className="btn bg-[#2E5430] text-white hover:bg-green-700">
            Solicitar Cotización
          </button>
        </div>
      </div>
    </div>
  );
}
