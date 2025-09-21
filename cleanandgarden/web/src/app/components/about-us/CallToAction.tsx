"use client";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#2E5430] py-14">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
        {/* Texto */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          ¿Listo/a para transformar tu jardín?
        </h2>

        {/* Botones */}
        <div className="flex items-center gap-6">
          <Link
            href="/agenda"
            className="btn bg-white rounded-lg text-[#2E5430] font-bold hover:bg-gray-100 border-none text-lg px-8 py-3"
          >
            ¡Agenda tu visita!
          </Link>

          <span className="text-white font-extrabold text-xl">O</span>

          <Link
            href="/contacto"
            className="btn bg-[#F1D06A] rounded-lg text-[#2E5430] font-bold border-none hover:bg-[#e5c759] text-lg px-8 py-3"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </section>
  );
}
