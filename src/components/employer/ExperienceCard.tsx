export const ExperienceCard = () => {
  const experiences = [
    'Competente en HTML, CSS, Scripting del Servidor, C/C++ y Oracle',
    'Experiencia con SEO',
    'Experiencia enseñando Desarrollo Web',
    'Conocimiento en Publicidad Online',
    'Experto en Pilas de Servicios Web LAMP'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Experiencia</h3>
      <ul className="space-y-2">
        {experiences.map((experience, index) => (
          <li key={index} className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-600">{experience}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
