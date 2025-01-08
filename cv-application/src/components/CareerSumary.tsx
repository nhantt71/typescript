import React from 'react';
import { useCVStore } from '../store/cvStore';

export const CareerSummary: React.FC = () => {
  const { data, updateSummary } = useCVStore();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Career Summary</h3>
      <textarea
        className="w-full p-3 border rounded-md min-h-[150px]"
        placeholder="Write a brief overview of your career..."
        value={data.summary}
        onChange={(e) => updateSummary(e.target.value)}
      />
    </div>
  );
};