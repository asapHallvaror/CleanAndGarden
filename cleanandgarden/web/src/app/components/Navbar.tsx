
"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar shadow-md px-4 sticky top-0 z-50" style={{ backgroundColor: '#f5e9d7' }}>
      {/* Logo a la izquierda */}
      <div className="navbar-start">
        <Link href="/" style={{ display: 'inline-block' }}>
          <Image src="/logo.png" alt="Logo Clean & Garden" width={48} height={48} className="h-12 w-auto" priority />
        </Link>
      </div>
      {/* Menú desktop centrado */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/about-us">Quienes Somos</Link></li>
          <li><Link href="/our-services">Servicios</Link></li>
          <li><Link href="/portfolio">Portafolio</Link></li>
          <li><Link href="/book-appointment">Agenda tu hora</Link></li>
        </ul>
      </div>
      {/* Botón de autenticación a la derecha en desktop */}
      <div className="navbar-end hidden lg:flex">
        <Link href="/login">
          <span className="btn rounded-lg" style={{ backgroundColor: '#4a7e49', color: '#fff', border: 'none' }}>
            Regístrate o inicia sesión
          </span>
        </Link>
      </div>
      {/* Menú móvil DaisyUI */}
      <div className="lg:hidden navbar-end" style={{ backgroundColor: '#f5e9d7' }}>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
            style={{ backgroundColor: '#f5e9d7' }}
          >
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/about-us">Quienes Somos</Link></li>
            <li><Link href="/our-services">Servicios</Link></li>
            <li><Link href="/portfolio">Portafolio</Link></li>
            <li><Link href="/book-appointment">Agenda tu hora</Link></li>
            <li>
              <Link href="/login">
                <span className="btn rounded-lg w-full" style={{ backgroundColor: '#4a7e49', color: '#fff', border: 'none' }}>
                  Regístrate o inicia sesión
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}