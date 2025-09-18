"use client";
import { useState } from "react";

export default function RestablecerContrasena() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nueva contraseña:", newPassword);
    console.log("Confirmar contraseña:", confirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Restablece tu contraseña
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nueva contraseña */}
          <label className="form-control text-left">
            <span className="label-text font-medium">
              Ingresa la nueva contraseña
            </span>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showNew ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </label>

          {/* Confirmar nueva contraseña */}
          <label className="form-control text-left">
            <span className="label-text font-medium">
              Confirma la nueva contraseña
            </span>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirm ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </label>

          {/* Botones */}
          <div className="flex gap-3 mt-4 justify-center">
            <button
              type="submit"
              className="btn bg-green-700 text-white w-1/2"
            >
              Confirmar cambio
            </button>
            <button
              type="button"
              className="btn bg-red-400 text-white w-1/2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
