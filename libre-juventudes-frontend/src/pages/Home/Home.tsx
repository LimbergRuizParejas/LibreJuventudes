import { useEffect, useState } from 'react';
import { getImagenes, Imagen } from '../../services/api';

type Propuesta = {
  titulo: string;
  contenido: string;
};

const propuestas: Propuesta[] = [
  {
    titulo: '💰 Salvar la economía boliviana',
    contenido: `- Acuerdo inmediato con el FMI para obtener liquidez.\n- Reducir el déficit fiscal del 10% al 3%.\n- Independencia del Banco Central.\n- Tipo de cambio único y flexible.\n- Fomento a la inversión y repatriación de capitales.`,
  },
  {
    titulo: '🏭 Reactivar la producción y el empleo',
    contenido: `- Incentivos a industria del gas y nueva ley de hidrocarburos.\n- Biotecnología agropecuaria y titulación de tierras.\n- Industrialización del litio y minería transparente.\n- Acuerdos comerciales con China, India, UE.\n- Turismo sostenible y conectividad bioceánica.\n- 750 mil empleos formales.`,
  },
  {
    titulo: '🏠 Propiedad popular: Empresas en manos de los bolivianos',
    contenido: `- Acciones valoradas en $us 1.500 para cada boliviano.\n- Intransferibles inicialmente, pero heredables.\n- Participación en directorios empresariales.`,
  },
  {
    titulo: '🌐 Bolivia Digital: Transformación tecnológica',
    contenido: `- Metas públicas y gestión por resultados.\n- Institucionalizar el INE.\n- Observatorio de Finanzas Públicas.\n- Fomento a la economía digital.`,
  },
  {
    titulo: '⚖️ Justicia, democracia y seguridad',
    contenido: `- Elección judicial por mérito.\n- Despolitizar Ministerio Público y Órgano Judicial.\n- Seguridad ciudadana y respeto a derechos.\n- Autonomía plena a gobernaciones y municipios.`,
  },
  {
    titulo: '👨‍👩‍👧 Política social con enfoque humano',
    contenido: `- Reforma de salud con calidad y acceso.\n- Educación técnica y evaluación internacional.\n- Bonos para desempleados.\n- Mejora del sistema de pensiones.`,
  },
  {
    titulo: '🌍 Reinserción internacional de Bolivia',
    contenido: `- Relanzar relaciones multilaterales.\n- Acuerdos con grandes potencias y bloques.\n- Diplomacia económica y participación global.`,
  },
];

const Home = () => {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [index, setIndex] = useState(0);

  // Cargar imágenes al montar
  useEffect(() => {
    const cargarImagenes = async () => {
      try {
        const response = await getImagenes();
        setImagenes(response);
      } catch (error) {
        console.error('Error cargando imágenes del carrusel:', error);
      }
    };
    cargarImagenes();
  }, []);

  // Rotar carrusel
  useEffect(() => {
    if (imagenes.length < 2) return;
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [imagenes]);

  return (
    <div className="space-y-12 px-4 md:px-16 py-10 bg-gray-50">
      {/* Encabezado */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Bienvenid@ a Libre Juventudes
        </h2>
        <p className="text-lg text-gray-800 max-w-2xl mx-auto">
          Una plataforma para compartir ideas, impulsar la participación y construir un mejor futuro para todos los bolivianos.
        </p>
      </section>

      {/* Carrusel dinámico */}
      <section>
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Imágenes de nuestra lucha por ser Libre
        </h3>

        {imagenes.length > 0 && imagenes[index] ? (
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded shadow-lg bg-white">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${imagenes[index].url}`}
              alt={imagenes[index].titulo || `Imagen ${index + 1}`}
              className="w-full h-64 sm:h-80 object-cover transition-opacity duration-700"
              onError={(e) =>
                (e.currentTarget.src = '/placeholder.jpg') // imagen por defecto si falla
              }
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {imagenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Imagen ${i + 1}`}
                  className={`w-3 h-3 rounded-full border border-white transition ${
                    index === i ? 'bg-red-600 scale-110' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-red-600 text-sm">
            No se pudieron cargar las imágenes del carrusel.
          </p>
        )}
      </section>

      {/* Propuestas */}
      <section>
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Propuestas del Plan de Gobierno
        </h3>
        <div className="grid gap-6">
          {propuestas.map((prop, i) => (
            <article
              key={i}
              className="bg-white p-4 border-l-4 border-red-600 rounded shadow hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold text-black mb-2">
                {prop.titulo}
              </h4>
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {prop.contenido}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
