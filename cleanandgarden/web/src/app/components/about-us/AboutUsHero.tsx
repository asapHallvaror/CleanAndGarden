"use client";
import Image from "next/image";

export default function AboutUsHero() {
  return (
    <section className="bg-[#fefaf2] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E5430] mb-4">
              ¿Quiénes somos?
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-800 max-w-xl">
              En Clean And Garden nos apasiona la naturaleza y las maravillas que
              nos regala. Desde el primer día, hemos trabajado con la misión de
              acercar la magia de las plantas a cada hogar y jardín. Estamos
              convencidos de que cada rincón puede transformarse en un oasis de
              vida, y estamos aquí para ser tu guía en ese camino.
            </p>
          </div>

          {/* Imagen */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-md">
              <Image
                src="/images/about-us.png"
                alt="Instalación de pasto en jardín"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
