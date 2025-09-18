"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confpassword: "",
    telefono: "",
    direccion: "",
    region: "",
    comuna: "",
    terminos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefaf2]">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center text-[#2E5430]">
          Registro
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre*"
              value={form.nombre}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido*"
              value={form.apellido}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Correo */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico*"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          {/* Contraseña */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="password"
              name="password"
              placeholder="Contraseña*"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="confpassword"
              placeholder="Confirma contraseña*"
              value={form.confpassword}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Teléfono */}
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono*"
            value={form.telefono}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          {/* Dirección */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección*"
            value={form.direccion}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          {/* Región y Comuna */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Escoge una región</option>
              <option value="rm">Región Metropolitana</option>
              <option value="v">Valparaíso</option>
              <option value="biobio">Biobío</option>
            </select>

            <select
              name="comuna"
              value={form.comuna}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Escoge una comuna</option>
              <option value="santiago">Santiago</option>
              <option value="quilpue">Quilpué</option>
              <option value="concepcion">Concepción</option>
            </select>
          </div>

          {/* Términos */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terminos"
              checked={form.terminos}
              onChange={handleChange}
              className="checkbox checkbox-success"
              required
            />
            <span>
              Acepto los{" "}
              <a href="#" className="text-[#2E5430] underline">
                términos y condiciones
              </a>
            </span>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-[#2E5430] hover:bg-green-700"
          >
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="font-medium text-[#2E5430] hover:underline">
            Inicia sesión
          </a>
        </p>

        <p className="mt-2 text-xs text-center text-gray-500">
          Tu información personal se mantendrá privada
        </p>
      </div>
    </div>
  );
}
