import React from 'react';
import { Card, CardContent, CardTitle, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { useCVStore } from '../store/cvStore';

export const PersonalInfoSection: React.FC = () => {
  const { data, updatePersonalInfo } = useCVStore();
  const { personalInfo } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Full Name"
          value={personalInfo.name}
          onChange={(e) => updatePersonalInfo({ name: e.target.value })}
        />
        <Input
          placeholder="Job Title"
          value={personalInfo.jobTitle}
          onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => updatePersonalInfo({ email: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={personalInfo.phone}
          onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={personalInfo.location}
          onChange={(e) => updatePersonalInfo({ location: e.target.value })}
        />
      </CardContent>
    </Card>
  );
};