export const ExperienceCard = () => {
  const experiences = [
    'Proficient in HTML, CSS, Server-Scripting, C/C++, and Oracle',
    'Experience with SEO',
    'Experience Teaching Web Development',
    'Knowledgeable in Online Advertising',
    'Expert in LAMP Web Service Stacks'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Experience</h3>
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
