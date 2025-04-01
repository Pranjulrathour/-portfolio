import React from 'react';
import { Input } from './input';

interface TechnologySelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const TechnologySelect: React.FC<TechnologySelectProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(Boolean);
    onChange(technologies);
  };

  return (
    <Input
      placeholder="React, Node.js, MongoDB (comma separated)"
      value={value.join(', ')}
      onChange={handleInputChange}
    />
  );
}; 