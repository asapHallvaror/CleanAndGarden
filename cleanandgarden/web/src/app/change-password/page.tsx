"use client";
import { useState } from "react";

export default function CambioContrasena() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de mensajes
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación en frontend antes de enviar
    if (newPassword !== confirmPassword) {
      setError("❌ Las contraseñas nuevas no coinciden");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, newPassword, confirmPassword }),
      });

      const data = await res.json();
      console.log("Respuesta backend:", data);

      if (res.ok) {
        setSuccess("✅ Contraseña actualizada correctamente");
        // limpiar campos
        setEmail("");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // limpiar mensaje después de 3 segundos
        setTimeout(() => setSuccess(""), 3000);

        // 👁️ Resetear visibilidad
        setShowPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } else {
        setError(`❌ ${data.error}`);
        // limpiar error después de 3 segundos
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      console.error("Error al conectar con backend:", err);
      setError("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] px-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-6">
        <h1 className="mb-6 text-3xl font-bold text-center text-[#2E5430]">
          Cambio de contraseña
        </h1>

        {/* Alertas */}
        {error && (
          <div className="alert alert-error shadow-lg mb-4">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success shadow-lg mb-4">
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <label className="form-control">
            <span className="label-text font-medium mb-3 block">
              Correo electrónico
            </span>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          {/* Contraseña actual */}
          <label className="form-control">
            <span className="label-text font-medium mb-3 block">
              Ingresa tu contraseña actual
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </label>

          {/* Nueva contraseña */}
          <label className="form-control">
            <span className="label-text font-medium mb-3 block">
              Ingresa la nueva contraseña
            </span>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showNewPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </label>

          {/* Confirmar nueva contraseña */}
          <label className="form-control">
            <span className="label-text font-medium mb-3 block">
              Confirma la nueva contraseña
            </span>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </label>

          {/* Enlace */}
          <a
            href="/forgot-password"
            className="text-sm text-gray-500 hover:underline text-center"
          >
            ¿No recuerdas tu contraseña actual?
          </a>

          {/* Botones */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="btn rounded-lg bg-green-700 text-white flex-1"
            >
              Confirmar cambio
            </button>
            <button
              type="button"
              className="btn rounded-lg bg-red-400 text-white flex-1"
              onClick={() => {
                setEmail("");
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
                setSuccess("");

                // 👁️ Resetear visibilidad
                setShowPassword(false);
                setShowNewPassword(false);
                setShowConfirmPassword(false);

                
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
