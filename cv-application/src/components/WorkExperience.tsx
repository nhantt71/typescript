import React from 'react';
import { useCVStore } from '../store/cvStore';

export const WorkExperience: React.FC = () => {
  const { data, addExperience, updateExperience, removeExperience } = useCVStore();

  const handleAdd = () => {
    addExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Experience
        </button>
      </div>
      
      {data.experience.map((exp) => (
        <div key={exp.id} className="mb-4 p-4 border rounded">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              className="p-2 border rounded"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              type="date"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              type="date"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
            />
          </div>
          <textarea
            className="w-full p-2 border rounded mb-2"
            placeholder="Description of your role and achievements..."
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
          />
          <button
            onClick={() => removeExperience(exp.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};