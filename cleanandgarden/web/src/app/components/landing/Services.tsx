// src/app/components/Servicios.tsx
"use client";
import Image from "next/image";

const servicios = [
  {
    titulo: "Poda",
    icono: "/icons/poda.svg",         // pon tus íconos en public/icons/
    fondo: "/images/poda.jpg",        // pon imágenes en public/images/
  },
  {
    titulo: "Riego",
    icono: "/icons/riego.svg",
    fondo: "/images/riego.jpg",
  },
  {
    titulo: "Asesoría",
    icono: "/icons/asesoria.svg",
    fondo: "/images/asesoria.jpg",
  },
  {
    titulo: "Mantención",
    icono: "/icons/mantencion.svg",
    fondo: "/images/mantencion.jpg",
  },
];

export default function Services() {
  return (
    <section className="bg-[#fefaf2] py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-extrabold text-[#2E5430] sm:text-4xl">
          Nuestros servicios
        </h2>
        <p className="mt-2 text-lg text-gray-700">
          ¡Échale un ojo a nuestros principales servicios!
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {servicios.map((servicio) => (
            <div
              key={servicio.titulo}
              className="group relative flex flex-col items-center"
            >
              {/* Imagen de fondo */}
              <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={servicio.fondo}
                  alt={servicio.titulo}
                  width={300}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay con icono */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Image
                    src={servicio.icono}
                    alt={servicio.titulo}
                    width={60}
                    height={60}
                    className="text-white"
                  />
                </div>
              </div>
              {/* Texto debajo */}
              <h3 className="mt-4 text-lg font-semibold text-[#2E5430]">
                {servicio.titulo}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
