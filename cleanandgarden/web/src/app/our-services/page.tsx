"use client";
import { useState, useEffect } from "react";
import ServicesList from "../components/our-services/ServicesList";
import ServicesCTA from "../components/our-services/ServicesCTA";
import { Service } from "../components/our-services/ServiceCard";

export default function OurServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/servicios');
        
        if (!response.ok) {
          throw new Error('Error al cargar los servicios');
        }
        
        const data = await response.json();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <main>
        <div className="bg-[#fefaf2] py-12 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-[#2E5430] text-center">
            Nuestros servicios
          </h1>
          <p className="text-center text-gray-700 mb-10">
            Cargando nuestros servicios...
          </p>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card lg:card-side bg-base-100 shadow-xl overflow-hidden animate-pulse">
                <div className="lg:w-1/3 h-64 bg-gray-300"></div>
                <div className="card-body lg:w-2/3">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-10 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="bg-[#fefaf2] py-12 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-[#2E5430] text-center">
            Nuestros servicios
          </h1>
          <div className="text-center text-red-600 mb-10">
            <p className="text-xl mb-4">⚠️ {error}</p>
            <p className="text-gray-600">
              Por favor, asegúrate de que el servidor esté ejecutándose en http://localhost:3001
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-[#2E5430] text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="bg-[#fefaf2] py-12 max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-[#2E5430] text-center">
            Nuestros servicios
          </h1>
          <p className="text-center text-gray-700 mb-10">
            Aquí te decimos lo que hacemos en cada servicio.
          </p>
          {services.length > 0 ? (
            <ServicesList services={services} />
          ) : (
            <div className="text-center text-gray-600 py-12">
              <p className="text-xl mb-4">🔧 No hay servicios disponibles</p>
              <p>Vuelve pronto para ver nuestros servicios.</p>
            </div>
          )}
        </div>
      </main>
      <ServicesCTA />
    </>
  );
}
