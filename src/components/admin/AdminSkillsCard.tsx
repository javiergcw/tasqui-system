export const AdminSkillsCard = () => {
  const skills = ['HTML', 'CSS', 'JS', 'PHP', 'Oracle', 'C/C++', 'SQL', 'Ruby'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Habilidades</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

