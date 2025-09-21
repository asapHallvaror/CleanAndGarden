"use client";
import { useState } from "react";
import Swal from "sweetalert2";

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

  // Estados para mostrar/ocultar
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

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
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password,
          confpassword: form.confpassword,
          telefono: form.telefono,
          direccion: form.direccion,
          region: form.region,
          comuna: form.comuna,
          terminos: form.terminos,
        }),
      });
  
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Error al registrar usuario");
      }
  
      const data = await res.json();
      console.log("Usuario creado:", data);

      // Toast de éxito
      Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: "Tu cuenta fue creada correctamente",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });

      // Opcional: limpiar formulario
      setForm({
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

      // Opcional: redirigir a login después de un pequeño delay
      // setTimeout(() => router.push("/login"), 500);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "No se pudo registrar",
        text: error?.message ?? "Ocurrió un error inesperado",
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

          {/* Contraseña y Confirmación */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Contraseña */}
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

            {/* Confirmar Contraseña */}
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
              name="region"
              value={form.region}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-md p-2 ${
                form.region === "" ? "text-gray-500" : "text-gray-900"
              }`}
              required
            >
              <option value="" className="text-blue">Escoge una región</option>
              <option value="rm">Región Metropolitana</option>
              <option value="v">Valparaíso</option>
              <option value="biobio">Biobío</option>
            </select>

            <select
              name="comuna"
              value={form.comuna}
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded-md p-2 ${
                form.region === "" ? "text-gray-500" : "text-gray-900"
              }`}
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
