"use client";
import { useState } from "react";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email para recuperación:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefaf2]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          ¿Olvidaste tu contraseña?
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          {/* Input correo */}
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-700"
            required
          />

          {/* Botón */}
          <button
            type="submit"
            className="text-white px-6 py-2 text-white rounded-md bg-[#2E5430] hover:bg-green-700"
          >
            Solicitar código
          </button>
        </form>

        {/* Texto informativo */}
        <p className="text-sm text-gray-600 mt-6">
          Se enviará un link a tu correo, en el cual podrás cambiar tu contraseña.
        </p>
      </div>
    </div>
  );
}
