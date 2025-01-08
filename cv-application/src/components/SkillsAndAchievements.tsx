import React from 'react';
import { useCVStore } from '../store/cvStore';
import type { Skill } from '../types/cv';

export const SkillsAndAchievements: React.FC = () => {
  const { data, addSkill, updateSkill, removeSkill, addAchievement, updateAchievement, removeAchievement } = useCVStore();

  return (
    <div className="mb-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <button
            onClick={() => addSkill({ name: '', level: 'Intermediate' })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>
        
        {data.skills.map((skill) => (
          <div key={skill.id} className="mb-2 flex items-center gap-2">
            <input
              className="flex-1 p-2 border rounded"
              placeholder="Skill name"
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
            />
            <select
              className="p-2 border rounded"
              value={skill.level}
              onChange={(e) => updateSkill(skill.id, { level: e.target.value as Skill['level'] })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              onClick={() => removeSkill(skill.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <button
            onClick={() => addAchievement({ title: '', description: '', date: '' })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Achievement
          </button>
        </div>
        
        {data.achievements.map((achievement) => (
          <div key={achievement.id} className="mb-4 p-4 border rounded">
            <input
              className="w-full p-2 border rounded mb-2"
              placeholder="Achievement title"
              value={achievement.title}
              onChange={(e) => updateAchievement(achievement.id, { title: e.target.value })}
            />
            <textarea
              className="w-full p-2 border rounded mb-2"
              placeholder="Description of your achievement..."
              value={achievement.description}
              onChange={(e) => updateAchievement(achievement.id, { description: e.target.value })}
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={achievement.date}
              onChange={(e) => updateAchievement(achievement.id, { date: e.target.value })}
            />
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};