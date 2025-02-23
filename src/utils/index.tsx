import React from 'react';

export const highlightMatch = (text: string, search: string): React.ReactNode => {
  if (!search) return text;
  
  const parts = text.split(new RegExp(`(${search})`, 'gi'));
  
  return parts.map((part, i) => 
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={i} className="font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}; 