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