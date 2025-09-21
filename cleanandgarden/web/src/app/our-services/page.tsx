// Make sure the path below matches the actual location and filename (case-sensitive)
import ServicesList from "../components/our-services/ServicesList";
import ServicesCTA from "../components/our-services/ServicesCTA";
// Example services data; replace with your actual data or import if needed
const services = [
  { id: "1", name: "Limpieza general", title: "Limpieza general", description: "Limpieza profunda de espacios interiores y exteriores.", imageUrl: "/images/limpieza.jpg" },
  { id: "2", name: "Jardinería", title: "Jardinería", description: "Mantenimiento y diseño de jardines.", imageUrl: "/images/jardineria.jpg" },
  // Agrega más servicios según sea necesario
];

export default function OurServicesPage() {
  return (
    <main>
        <div className="bg-[#fefaf2] py-12 max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-extrabold text-[#2E5430] text-center">Nuestros servicios</h1>
            <p className="text-center text-gray-700 mb-10">Aquí te decimos lo que hacemos en cada servicio.</p>
            <ServicesList services={services} />
        </div>
      <ServicesCTA />
    </main>
    )
}
