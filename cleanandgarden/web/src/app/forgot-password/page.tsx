"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Ingresa un correo válido.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // tu backend responde genérico, asumimos 200 o 404
      if (res.ok) {
        setMessage("Si el correo existe, se enviará un email con las instrucciones.");
      } else {
        // posibles errores de red/servidor
        const json = await res.json().catch(() => null);
        setError(json?.error || "Ocurrió un error. Intenta nuevamente.");
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Recuperar contraseña</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="form-control text-left">
            <span className="label-text font-medium">Correo electrónico</span>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn rounded-lg text-white bg-[#2E5430] hover:bg-green-700"
          >
            {loading ? "Enviando..." : "Enviar enlace de recuperación"}
          </button>

          {message && <p className="text-green-600 mt-2">{message}</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
