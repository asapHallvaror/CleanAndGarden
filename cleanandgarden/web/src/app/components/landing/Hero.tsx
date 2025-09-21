"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#fefaf2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Columna izquierda: texto */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-[#2E5430]">
              Transforma
              <br /> tu jardín
            </h1>

            <p className="mt-6 text-lg text-gray-700 max-w-xl">
              Con nuestros servicios profesionales de jardinería
            </p>

            <div className="mt-8">
              <a
                href="#agenda"
                className="inline-block rounded-md bg-[#2E5430] px-6 py-3 font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5430]"
              >
                Agenda tu visita
              </a>
            </div>
          </div>

          {/* Columna derecha: imagen */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/images/hero-paisajismo.png"
                alt="Jardín colorido con sendero y flores"
                width={1200}
                height={800}
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
