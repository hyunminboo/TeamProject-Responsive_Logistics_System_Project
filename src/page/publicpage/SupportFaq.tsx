import { useState } from 'react';
import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';
import { faqData } from '../../data/faqData';
import { useBoardFilter } from '../../hooks/useBoardFilter';
import BoardFilterBar from '../../components/BoardFilterBar';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import './SupportFaq.scss';

export default function SupportFaq() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const {
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    setSearchQuery,
    filteredAndSortedData
  } = useBoardFilter(faqData, '전체');

  // Badge colors
  const getBadgeClass = (type: string) => {
    switch(type) {
      case '배송문의': return 'badge-blue';
      case '반품/교환': return 'badge-green';
      case '주소변경': return 'badge-yellow';
      case '파손/분실': return 'badge-red';
      case '앱이용': return 'badge-purple';
      default: return 'badge-gray';
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const FAQ_CATEGORIES = ['전체', '배송문의', '반품/교환', '주소변경', '파손/분실', '앱이용'];

  return (
    <SubPageLayout 
      heroTitle="자주 묻는 질문"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '고객센터' },
        { label: '자주 묻는 질문' }
      ]}
      sidebarData={sidebarData.support}
    >
      <div className="support-faq">
        <div className="faq-header">
          <div className="title-group">
            <h3>자주 묻는 질문</h3>
            <p>총 {filteredAndSortedData.length}개의 질문이 등록되어 있습니다</p>
          </div>
          <div className="sort-dropdown">
            <button onClick={() => setSortOrder(prev => prev === '최신순' ? '과거순' : '최신순')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
              {sortOrder} 
              <ChevronDown 
                size={16} 
                style={{ 
                  transform: sortOrder === '과거순' ? 'rotate(180deg)' : 'none', 
                  transition: 'transform 0.2s' 
                }} 
              />
            </button>
          </div>
        </div>

        <BoardFilterBar
          categories={FAQ_CATEGORIES}
          activeCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearchSubmit={setSearchQuery}
        />

        <div className="faq-list">
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map(item => {
              const isExpanded = expandedId === item.id;
              return (
                <div className={`faq-item ${isExpanded ? 'expanded' : ''}`} key={item.id}>
                  <div className="faq-question" onClick={() => toggleExpand(item.id as number)}>
                    <div className="q-left">
                      <span className={`type-badge ${getBadgeClass(item.type!)}`}>{item.type}</span>
                      <span className="q-text">{item.title}</span>
                    </div>
                    <div className="q-right">
                      {isExpanded ? <ChevronUp size={20} color="#3b82f6" /> : <ChevronDown size={20} color="#cbd5e1" />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="faq-answer">
                      <div className="a-label">
                        <span className="a-icon">A</span>
                        <strong>답변</strong>
                      </div>
                      <div className="a-content">
                        <p>{item.content}</p>
                        
                        {item.steps && (
                          <ol className="a-steps">
                            {item.steps.map((step, idx) => (
                              <li key={idx}>
                                <span className="step-num">{idx + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        )}

                        {item.actions && (
                          <div className="a-actions">
                            {item.actions.map((act, idx) => (
                              <button key={idx} className="btn-action">
                                {idx === 0 ? '🎧' : '📄'} {act}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
              조건에 맞는 질문이 없습니다.
            </div>
          )}
        </div>

        <div className="faq-footer">
          <div className="total-count">총 {filteredAndSortedData.length}개 질문</div>
          {filteredAndSortedData.length > 0 && (
            <div className="pagination">
              <button className="page-btn nav-btn"><ChevronLeft size={16} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn nav-btn"><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </div>
    </SubPageLayout>
  );
}
