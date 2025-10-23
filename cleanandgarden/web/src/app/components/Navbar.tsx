"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // 👈 evitar render en SSR

  // 🧭 Asegurar que estamos en el cliente (no SSR)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Verificar sesión
  useEffect(() => {
    if (!isClient) return;

    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:3001/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.user) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }
      } catch {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 🔁 Escuchar eventos globales de sesión
    const handleSessionChange = (event: Event) => {
      const custom = event as CustomEvent;
      if (custom.detail === "login") setIsLoggedIn(true);
      if (custom.detail === "logout") setIsLoggedIn(false);
    };

    window.addEventListener("session-change", handleSessionChange);
    return () => {
      window.removeEventListener("session-change", handleSessionChange);
    };
  }, [isClient]);

  // 🚪 Cerrar sesión con confirmación
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4a7e49",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch("http://localhost:3001/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("isLoggedIn");
        window.dispatchEvent(new CustomEvent("session-change", { detail: "logout" }));

        await Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.href = "/login";
      } else {
        Swal.fire("Error", "No se pudo cerrar la sesión correctamente", "error");
      }
    } catch {
      Swal.fire("Error", "Error de conexión con el servidor", "error");
    }
  };

  // ⚙️ Evitar render antes de montar el cliente
  if (!isClient) return null;

  // ⏳ Mostrar mientras valida sesión (sin error de hydration)
  if (loading)
    return (
      <div className="navbar shadow-md px-4 sticky top-0 z-50 bg-[#f5e9d7]">
        <div className="flex justify-center w-full py-3 text-[#4a7e49] font-medium">
          Verificando sesión...
        </div>
      </div>
    );

  return (
    <div
      className="navbar shadow-md px-4 sticky top-0 z-50"
      style={{ backgroundColor: "#f5e9d7" }}
    >
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" style={{ display: "inline-block" }}>
          <Image
            src="/logo.png"
            alt="Logo Clean & Garden"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Menú principal */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/about-us">Quienes Somos</Link></li>
          <li><Link href="/our-services">Servicios</Link></li>
          <li><Link href="/portfolio">Portafolio</Link></li>
          <li><Link href="/book-appointment">Agenda tu hora</Link></li>
        </ul>
      </div>

      {/* Zona derecha (botones sesión) */}
      <div className="navbar-end hidden lg:flex space-x-4">
        {!isLoggedIn ? (
          <>
            <Link href="/login">
              <span
                className="btn rounded-lg"
                style={{ backgroundColor: "#4a7e49", color: "#fff", border: "none" }}
              >
                Inicia Sesión
              </span>
            </Link>
            <Link href="/register">
              <span
                className="btn rounded-lg"
                style={{ backgroundColor: "#4a7e49", color: "#fff", border: "none" }}
              >
                Regístrate
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/mensajes">
              <span
                className="btn rounded-lg"
                style={{ backgroundColor: "#4a7e49", color: "#fff", border: "none" }}
              >
                Mensajes
              </span>
            </Link>
            <Link href="/profile">
              <span
                className="btn rounded-lg"
                style={{ backgroundColor: "#4a7e49", color: "#fff", border: "none" }}
              >
                Mi Perfil
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="btn rounded-lg"
              style={{ backgroundColor: "#b93b3b", color: "#fff", border: "none" }}
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>

      {/* Menú móvil */}
      <div className="lg:hidden navbar-end" style={{ backgroundColor: "#f5e9d7" }}>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
            style={{ backgroundColor: "#f5e9d7" }}
          >
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/about-us">Quienes Somos</Link></li>
            <li><Link href="/our-services">Servicios</Link></li>
            <li><Link href="/portfolio">Portafolio</Link></li>
            <li><Link href="/book-appointment">Agenda tu hora</Link></li>
            {!isLoggedIn ? (
              <li>
                <Link href="/login">
                  <span className="btn rounded-lg w-full bg-[#4a7e49] text-white border-none">
                    Regístrate o inicia sesión
                  </span>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/mensajes">
                    <span className="btn rounded-lg w-full bg-[#4a7e49] text-white border-none">
                      Mensajes
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <span className="btn rounded-lg w-full bg-[#4a7e49] text-white border-none">
                      Mi Perfil
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn rounded-lg w-full bg-[#b93b3b] text-white border-none"
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
