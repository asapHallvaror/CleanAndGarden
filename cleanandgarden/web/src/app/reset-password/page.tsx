"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // iconos de ojo

function ResetPasswordContent() {
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

  useEffect(() => {
    if (newPassword === "") setShowNew(false);
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword === "") setShowConfirm(false);
  }, [confirmPassword]);

  // 🔒 Validar complejidad de contraseña segura
  const validarPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password);
  };

  const validate = () => {
    setError(null);
    if (!token) return "Token faltante.";

    // ✅ Validar formato seguro
    if (!validarPassword(newPassword)) {
      return "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.";
    }

    if (newPassword !== confirmPassword)
      return "Las contraseñas no coinciden.";
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (res.ok) {
        setMessage(
          "Contraseña cambiada correctamente. Serás redirigido al login..."
        );
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Restablece tu contraseña
        </h1>

        {!token ? (
          <p className="text-red-600">
            Token no válido. Revisa el enlace del correo.
          </p>
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
                  aria-label={
                    showNew ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-2 top-2.5 text-gray-600 p-1"
                >
                  {showNew ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>

                {/* Reglas visuales */}
                <small className="text-gray-500 text-xs block mt-1">
                  Mínimo 8 caracteres, una mayúscula, una minúscula, un número y
                  un carácter especial.
                </small>
              </div>
            </label>

            {/* Confirmar nueva contraseña */}
            <label className="form-control text-left relative">
              <span className="label-text font-medium">
                Confirmar contraseña
              </span>
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
                  aria-label={
                    showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-2 top-2.5 text-gray-600 p-1"
                >
                  {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </label>

            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && (
              <div className="flex items-start gap-2 mt-3 p-3 rounded-md border border-red-300 bg-red-50 text-red-700 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 1010 10A10 10 0 0012 2z"
                  />
                </svg>
                <p className="leading-tight">{error}</p>
              </div>
            )}

            <div className="flex gap-3 mt-4 justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn rounded-lg text-white bg-[#2E5430] hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Cambiando..." : "Confirmar cambio"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

// se pusieron dentro de un suspense para evitar el error de Next.js
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
