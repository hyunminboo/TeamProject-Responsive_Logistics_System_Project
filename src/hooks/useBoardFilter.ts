import { useState, useMemo } from 'react';

// 어떤 데이터(Notice, FAQ 등)가 들어오더라도 처리할 수 있도록 제네릭 타입 T를 사용합니다.
// 데이터 객체는 type, title, content, date 등의 기본 속성을 가질 것으로 예상합니다.
export function useBoardFilter<T extends { 
  type?: string; 
  title: string; 
  content: string; 
  date?: string; 
  isPinned?: boolean; 
}>(
  initialData: T[],
  defaultCategory: string = '전체'
) {
  const [categoryFilter, setCategoryFilter] = useState(defaultCategory);
  const [sortOrder, setSortOrder] = useState('최신순');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedData = useMemo(() => {
    let result = [...initialData];

    // 1. 카테고리 필터 (type 속성 기준)
    if (categoryFilter !== '전체') {
      result = result.filter(item => item.type === categoryFilter);
    }

    // 2. 검색 필터 (title 또는 content 기준)
    if (searchQuery) {
      result = result.filter(item => 
        item.title.includes(searchQuery) || item.content.includes(searchQuery)
      );
    }

    // 3. 정렬 로직
    result.sort((a, b) => {
      // 핀(고정) 항목이 있다면 항상 최상단에 배치
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // 날짜 데이터가 없는 경우 정렬하지 않음
      if (!a.date || !b.date) return 0;

      // "2025.12.10" 같은 형식을 Date 객체가 인식할 수 있게 "2025/12/10"으로 변환
      const dateA = new Date(a.date.replace(/\./g, '/')).getTime();
      const dateB = new Date(b.date.replace(/\./g, '/')).getTime();

      if (sortOrder === '최신순') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return result;
  }, [initialData, categoryFilter, sortOrder, searchQuery]);

  return {
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    searchQuery,
    setSearchQuery,
    filteredAndSortedData,
  };
}
