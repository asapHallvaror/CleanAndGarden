"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Token no encontrado. Usa el enlace enviado por correo.");
    } else {
      setError(null);
    }
  }, [token]);

  // Cuando los campos queden vacíos, forzamos que se oculten los textos
  useEffect(() => {
    if (newPassword === "") setShowNew(false);
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword === "") setShowConfirm(false);
  }, [confirmPassword]);

  const validate = () => {
    setError(null);
    if (!token) return "Token faltante.";
    if (newPassword.trim().length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (newPassword !== confirmPassword) return "Las contraseñas no coinciden.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (res.ok) {
        setMessage("Contraseña cambiada correctamente. Serás redirigido al login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const json = await res.json().catch(() => null);
        setError(json?.message || "Error al cambiar la contraseña.");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fefaf2]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Restablece tu contraseña</h1>

        {!token ? (
          <p className="text-red-600">Token no válido. Revisa el enlace del correo.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nueva contraseña */}
            <label className="form-control text-left relative">
              <span className="label-text font-medium">Nueva contraseña</span>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label={showNew ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-2 top-2.5 text-gray-600 p-1"
                >
                  {showNew ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </label>

            {/* Confirmar nueva contraseña */}
            <label className="form-control text-left relative">
              <span className="label-text font-medium">Confirmar contraseña</span>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repite la contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pr-10"
                  required
                />
                <button
                  type="button"
                  aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-2 top-2.5 text-gray-600 p-1"
                >
                  {showConfirm ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </label>

            <div className="flex gap-3 mt-4 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn rounded-lg text-white bg-[#2E5430] hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Cambiando..." : "Confirmar cambio"}
              </button>
            </div>

            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
