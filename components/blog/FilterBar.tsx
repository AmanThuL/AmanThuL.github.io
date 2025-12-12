import React from 'react';
import { BlogCategory } from '../../types';
import { FilterButton } from '../ui/FilterButton';

interface FilterBarProps {
  categories: BlogCategory[];
  selected: BlogCategory;
  onSelect: (category: BlogCategory) => void;
  allLabel: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selected,
  onSelect,
  allLabel,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-6">
      <FilterButton
        variant="accent"
        active={selected === 'All'}
        onClick={() => onSelect('All')}
        className="px-4 py-2 text-xs"
      >
        {allLabel}
      </FilterButton>
      {categories
        .filter((c) => c !== 'All')
        .map((cat) => (
          <FilterButton
            key={cat}
            variant="accent"
            active={selected === cat}
            onClick={() => onSelect(cat)}
            className="px-4 py-2 text-xs"
          >
            {cat}
          </FilterButton>
        ))}
    </div>
  );
};
