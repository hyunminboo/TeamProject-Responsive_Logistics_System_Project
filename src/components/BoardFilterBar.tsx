import { Search } from 'lucide-react';
import './BoardFilterBar.scss';

interface BoardFilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchInput: string;
  onSearchInputChange: (val: string) => void;
  onSearchSubmit: (val: string) => void;
}

export default function BoardFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchInput,
  onSearchInputChange,
  onSearchSubmit
}: BoardFilterBarProps) {
  return (
    <div className="board-filter-bar">
      <div className="filter-tabs">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={activeCategory === cat ? 'active' : ''}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="board-search-bar">
        <Search size={18} color="#94a3b8" />
        <input 
          type="text" 
          placeholder="제목이나 내용 검색" 
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchSubmit(searchInput);
          }}
        />
        <button className="btn-search" onClick={() => onSearchSubmit(searchInput)}>검색</button>
      </div>
    </div>
  );
}
