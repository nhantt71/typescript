import React from 'react';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { CareerSummary } from './components/CareerSumary';
import { WorkExperience } from './components/WorkExperience';
import { Educations } from './components/Education';
import { SkillsAndAchievements } from './components/SkillsAndAchievements';
import { CVPreview } from './components/CVPreview';
import { exportToPDF } from './utils/pdfExport';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">CV Builder</h1>
          <button
            onClick={exportToPDF}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Export to PDF
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PersonalInfoSection />
            <CareerSummary />
            <WorkExperience />
            <Educations />
            <SkillsAndAchievements />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg sticky top-8 h-fit">
            <CVPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;