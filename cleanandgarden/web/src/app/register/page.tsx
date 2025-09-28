"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // para redirigir
import Swal from "sweetalert2";

// Interfaces para los datos que vienen de la base de datos
interface Region {
  id: string;
  nombre: string;
}

interface Comuna {
  id: string;
  nombre: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confpassword: "",
    telefono: "",
    direccion: "",
    comunaId: "", // solo guardamos comuna
    terminos: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  // Estados para regiones/comunas dinámicas
  const [regiones, setRegiones] = useState<Region[]>([]);
  const [comunas, setComunas] = useState<Comuna[]>([]);
  const [regionId, setRegionId] = useState("");

  // Cargar regiones al inicio
  useEffect(() => {
    fetch("http://localhost:3001/regiones")
      .then((res) => res.json())
      .then((data) => setRegiones(data))
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar las regiones", "error")
      );
  }, []);

  // Cargar comunas cuando cambie la región
  useEffect(() => {
    if (regionId) {
      fetch(`http://localhost:3001/regiones/${regionId}/comunas`)
        .then((res) => res.json())
        .then((data) => setComunas(data))
        .catch(() =>
          Swal.fire("Error", "No se pudieron cargar las comunas", "error")
        );
    } else {
      setComunas([]);
      setForm(prevForm => ({ ...prevForm, comunaId: "" }));
    }
  }, [regionId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === "checkbox") {
      checked = (e.target as HTMLInputElement).checked;
    }
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confpassword) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Error al registrar usuario");
      }

      const data = await res.json();
      console.log("Usuario creado:", data);

      Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: "Tu cuenta fue creada correctamente",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset de estados
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confpassword: "",
        telefono: "",
        direccion: "",
        comunaId: "",
        terminos: false,
      });
      setRegionId("");
      setShowPassword(false);
      setShowConfPassword(false);

      // Redirección automática al login
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error inesperado";
      Swal.fire({
        icon: "error",
        title: "No se pudo registrar",
        text: message,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    }
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
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido*"
              value={form.apellido}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
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
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />

          {/* Contraseñas */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña*"
                value={form.password}
                onChange={handleChange}
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
            <div className="relative">
              <input
                type={showConfPassword ? "text" : "password"}
                name="confpassword"
                placeholder="Confirma contraseña*"
                value={form.confpassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfPassword(!showConfPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Teléfono */}
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono*"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />

          {/* Dirección */}
          <input
            type="text"
            name="direccion"
            placeholder="Dirección*"
            value={form.direccion}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />

          {/* Región y Comuna */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <select
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Escoge una región</option>
              {Array.isArray(regiones) &&
                regiones.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
            </select>

            <select
              name="comunaId"
              value={form.comunaId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
              disabled={!regionId}
            >
              <option value="">Escoge una comuna</option>
              {Array.isArray(comunas) &&
                comunas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
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

          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-[#2E5430] hover:bg-green-700"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
