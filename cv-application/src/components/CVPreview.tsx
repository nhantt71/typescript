import React from 'react';
import { useCVStore } from '../store/cvStore';

export const CVPreview: React.FC = () => {
  const { data, theme } = useCVStore();
  
  return (
    <div id="cv-preview" className={`cv-preview theme-${theme} p-8`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
        <h2 className="text-xl text-gray-600">{data.personalInfo.jobTitle}</h2>
        <div className="text-sm text-gray-500 mt-2">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>
      
      {data.summary && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Professional Summary</h3>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}
      
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Experience</h3>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h4 className="font-semibold">{exp.position}</h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};