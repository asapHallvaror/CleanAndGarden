
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Aquí después llamas al backend con fetch o axios
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefaf2]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-[#2E5430]">
          Iniciar sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"/>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"/>
          </div>

          <div className="flex justify-between text-sm">
            <a href="#" className="text-[#2E5430] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-[#2E5430] hover:bg-green-700"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="font-medium text-[#2E5430] hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
