"use client";

import { useState } from "react";

export default function Navbar() {
  return (
  <div className="navbar shadow-md px-4 sticky top-0 z-50" style={{ backgroundColor: '#f5e9d7' }}>
      {/* Logo a la izquierda */}
      <div className="navbar-start">
        <a href="/" style={{ display: 'inline-block' }}>
          <img src="/logo.png" alt="Logo Clean & Garden" className="h-12 w-auto" />
        </a>
      </div>
      {/* Menú desktop centrado */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li><a href="/">Inicio</a></li>
          <li><a href="/about-us">Quienes Somos</a></li>
          <li><a href="/our-services">Servicios</a></li>
          <li><a href="#">Portafolio</a></li>
          <li><a href="#">Agenda tu hora</a></li>
        </ul>
      </div>
      {/* Botón de autenticación a la derecha en desktop */}
      <div className="navbar-end hidden lg:flex">
    <a href="#" className="btn rounded-lg" style={{ backgroundColor: '#4a7e49', color: '#fff', border: 'none' }}>Regístrate o inicia sesión</a>
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
            <li><a href="/">Inicio</a></li>
            <li><a href="/about-us">Quienes Somos</a></li>
            <li><a href="/our-services">Servicios</a></li>
            <li><a href="#">Portafolio</a></li>
            <li><a href="#">Agenda tu hora</a></li>
            <li><a href="#" className="btn rounded-lg w-full" style={{ backgroundColor: '#4a7e49', color: '#fff', border: 'none' }}>Regístrate o inicia sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
