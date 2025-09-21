"use client";

import { FaLeaf, FaHandshake } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

type Member = { nombre: string; rol: string; avatarBg?: string };

const equipo: Member[] = [
  { nombre: "Pablo Carvajal", rol: "Paisajista", avatarBg: "/images/leaf-texture.jpg" },
  { nombre: "José García", rol: "Especialista", avatarBg: "/images/leaf-texture.jpg" },
];

const valores = [
  { icon: <FaLeaf className="text-4xl" />, titulo: "Sostenibilidad" },
  { icon: <AiFillHeart className="text-4xl" />, titulo: "Calidad" },
  { icon: <FaHandshake className="text-4xl" />, titulo: "Compromiso" },
];

const historia = [
  { year: "2020", label: "Fundación" },
  { year: "2021", label: "Primeros servicios" },
  { year: "2023", label: "Servicio expandido" },
  { year: "2025", label: "+50 clientes" },
];

export default function OurTeam() {
  return (
    <section className="bg-[#fefaf2] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ===== Nuestro equipo ===== */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#2E5430]">Nuestro equipo</h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {equipo.map((m) => (
              <div key={m.nombre} className="card bg-base-100 shadow-md rounded-2xl">
                <div className="card-body items-center text-center">
                  {/* Avatar circular con textura verde y silueta */}
                  <div className="avatar">
                    <div
                      className="w-24 h-24 rounded-full ring ring-[#2E5430] ring-offset-2 overflow-hidden relative"
                      style={{
                        backgroundImage: `url(${m.avatarBg ?? "/images/leaf-texture.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <span className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                        {/* Silueta simple */}
                        <span aria-hidden>👤</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-semibold text-[#2E5430]">{m.nombre}</h3>
                  <p className="text-sm text-gray-600">{m.rol}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Nuestros valores (franja café) ===== */}
        <div className="rounded-2xl bg-[#6B4B3E] py-12">
          <h3 className="text-center text-3xl font-extrabold text-white">Nuestros valores</h3>

          <div className="mt-10 grid grid-cols-1 gap-8 text-center text-white sm:grid-cols-3">
            {valores.map((v) => (
              <div key={v.titulo} className="flex flex-col items-center gap-2">
                {v.icon}
                <p className="font-semibold">{v.titulo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Nuestra historia (timeline con steps de DaisyUI) ===== */}
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-[#2E5430]">Nuestra historia</h3>

          {/* línea de tiempo */}
          <ul className="steps steps-horizontal mt-10 w-full">
            {historia.map((_, i) => (
              <li key={i} className="step step-success" data-content=""></li>
            ))}
          </ul>

          {/* etiquetas (años y descripciones) */}
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {historia.map((h) => (
              <div key={h.year} className="text-center">
                <p className="font-bold text-[#2E5430]">{h.year}</p>
                <p className="text-sm text-gray-600">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
