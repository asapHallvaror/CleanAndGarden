"use client";

export default function Location() {
  return (
    <section className="bg-[#fefaf2] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* encabezado */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E5430]">
            Ubicación
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            Encuéntranos y agenda una visita a tu jardín
          </p>
        </div>

        {/* contenido */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* mapa */}
          <div className="overflow-hidden rounded-xl shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.701027260726!2d-71.6412345!3d-33.6101234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662143d9f12345%3A0x987654321!2sLas%20Azaleas%2C%20Santo%20Domingo%2C%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1726600000000!5m2!1ses!2scl"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* info */}
          <div className="rounded-xl bg-white p-6 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#2E5430]">Clean And Garden</h3>
              <p className="mt-2 text-gray-700">
                Las Azaleas, Santo Domingo, Valparaíso
              </p>
              <p className="mt-2 text-gray-700">
                Atención de lunes a viernes <br />
                de 9:00 a 20:00
              </p>
              <p className="mt-2 text-gray-700">+56 9 5499 3343</p>
              <p className="mt-1 text-gray-700">
                contacto@cleanandgarden.cl
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="btn bg-red-400 rounded-lg text-white hover:bg-red-500 border-none flex-1">
                Atención en terreno
              </button>
              <button className="btn bg-[#2E5430] rounded-lg text-white hover:bg-green-700 border-none flex-1">
                Agendar visita
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
