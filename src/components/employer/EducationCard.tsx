export const EducationCard = () => {
  const education = [
    {
      institution: 'Amherst School',
      location: 'USA',
      period: '2000-2010'
    },
    {
      institution: 'Swarthmore College',
      location: 'USA',
      period: '2010-2012'
    },
    {
      institution: 'Princeton University',
      location: 'USA',
      period: '2012-2016'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index}>
            <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
            <p className="text-gray-600">{edu.location}</p>
            <p className="text-sm text-gray-500">{edu.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
