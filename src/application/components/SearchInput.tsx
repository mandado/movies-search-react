import { ChevronDown } from 'lucide-react';
import React from 'react';

interface SearchInputProps {
  searchRef: React.RefObject<HTMLInputElement>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestedText: string | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchRef,
  searchTerm,
  setSearchTerm,
  handleKeyDown,
  suggestedText
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pesquise um filme"
          className="w-full p-3 sm:p-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm sm:text-base"
        />
        {suggestedText && searchTerm && (
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hidden sm:block">
            <span className="text-xs sm:text-sm">
              ← → para autocompletar "{suggestedText}"
            </span>
          </div>
        )}
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      <p className="text-xs sm:text-sm text-gray-500 mt-1">
        Utilize as teclas ↑ ↓ para navegar, ← → para autocompletar
      </p>
    </div>
  );
};

export default SearchInput; 