"use client";
import Link from "next/link";

export default function AboutUsCTA() {
  return (
    <section className="bg-[#2E5430] py-10">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center gap-6 text-center">
        {/* Título */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
          Descubre cómo nuestros servicios pueden mejorar la vida de tu jardín
        </h2>

        {/* Botones */}
        <div className="flex items-center gap-4">
          <Link
            href="/agenda"
            className="btn bg-white rounded-lg text-[#2E5430] font-extrabold border-none hover:bg-gray-100"
          >
            ¡Agenda tu visita!
          </Link>

          <span className="text-white font-bold">O</span>

          <Link
            href="/contacto"
            className="btn bg-[#F1D06A] rounded-lg text-[#2E5430] font-extrabold border-none hover:bg-[#e5c759]"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  );
}
