import React from 'react';
import { useCVStore } from '../store/cvStore';

export const Educations: React.FC = () => {
  const { data, addEducation, updateEducation, removeEducation } = useCVStore();

  const handleAdd = () => {
    addEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Education
        </button>
      </div>
      
      {data.education.map((edu) => (
        <div key={edu.id} className="mb-4 p-4 border rounded">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              className="p-2 border rounded"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="p-2 border rounded"
              type="date"
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              type="date"
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
            />
          </div>
          <button
            onClick={() => removeEducation(edu.id)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
