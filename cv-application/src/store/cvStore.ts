import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  profilePicture?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  achievements: Achievement[];
}

export type Theme = 'professional' | 'creative' | 'minimalist';

interface CVStore {
  data: CVData;
  theme: Theme;
  
  // Personal Info Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Summary Actions
  updateSummary: (summary: string) => void;
  
  // Experience Actions
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  // Education Actions
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Skills Actions
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  
  // Achievement Actions
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  
  // Theme Actions
  setTheme: (theme: Theme) => void;
}

const initialState: CVData = {
  personalInfo: {
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  achievements: [],
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      data: initialState,
      theme: 'professional',

      // Personal Info
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),

      // Summary
      updateSummary: (summary) =>
        set((state) => ({
          data: { ...state.data, summary },
        })),

      // Experience
      addExperience: (experience) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              { ...experience, id: crypto.randomUUID() },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((exp) => exp.id !== id),
          },
        })),

      // Education
      addEducation: (education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              { ...education, id: crypto.randomUUID() },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),

      // Skills
      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [
              ...state.data.skills,
              { ...skill, id: crypto.randomUUID() },
            ],
          },
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s.id !== id),
          },
        })),

      // Achievements
      addAchievement: (achievement) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: [
              ...state.data.achievements,
              { ...achievement, id: crypto.randomUUID() },
            ],
          },
        })),

      updateAchievement: (id, achievement) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: state.data.achievements.map((a) =>
              a.id === id ? { ...a, ...achievement } : a
            ),
          },
        })),

      removeAchievement: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            achievements: state.data.achievements.filter((a) => a.id !== id),
          },
        })),

      // Theme
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'cv-storage', // name of the item in localStorage
      version: 1, // version number for migrations
    }
  )
);