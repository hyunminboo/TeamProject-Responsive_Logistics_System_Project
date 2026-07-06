import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';
import { noticeData } from '../../data/noticeData';
import { Pin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBoardFilter } from '../../hooks/useBoardFilter';
import BoardFilterBar from '../../components/BoardFilterBar';
import './SupportNotice.scss';

export default function SupportNotice() {
  const navigate = useNavigate();
  
  // 새로 만든 커스텀 훅(useBoardFilter)을 사용하여 로직을 깔끔하게 가져옵니다.
  const {
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    setSortOrder,
    searchInput,
    setSearchInput,
    setSearchQuery,
    filteredAndSortedData
  } = useBoardFilter(noticeData, '전체');

  // 공지사항 페이지 전용 카테고리 목록
  // FAQ 페이지를 만들 때는 이 부분만 FAQ 전용 카테고리로 바꾸면 됩니다.
  const NOTICE_CATEGORIES = ['전체', '시스템', '휴무/연휴', '보안주의', '운영안내'];

  // 뱃지 색상 클래스 가져오기
  const getBadgeClass = (type: string) => {
    switch(type) {
      case '보안주의': return 'badge-orange';
      case '휴무/연휴': return 'badge-blue';
      case '시스템': return 'badge-purple';
      case '운영안내': return 'badge-green';
      default: return 'badge-gray';
    }
  };

  return (
    <SubPageLayout 
      heroTitle="공지사항"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '고객센터' },
        { label: '공지사항' }
      ]}
      sidebarData={sidebarData.support}
    >
      <div className="support-notice">
        {/* Header */}
        <div className="notice-header">
          <div className="title-group">
            <h3>공지사항</h3>
            <p>총 {filteredAndSortedData.length}건의 공지사항이 있습니다</p>
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

        {/* Filters */}
        <BoardFilterBar
          categories={NOTICE_CATEGORIES}
          activeCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearchSubmit={setSearchQuery}
        />

        {/* Table List */}
        <div className="notice-table">
          <div className="table-header">
            <div className="col-id">번호</div>
            <div className="col-type">분류</div>
            <div className="col-title">제목</div>
            <div className="col-date">등록일</div>
          </div>
          <div className="table-body">
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((notice) => (
                <div 
                  className={`table-row ${notice.isPinned ? 'pinned' : ''}`} 
                  key={notice.id}
                  onClick={() => navigate(`/support/notice/${notice.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="col-id">
                    {notice.isPinned ? <Pin size={18} color="#f97316" /> : notice.id}
                  </div>
                  <div className="col-type">
                    <span className={`type-badge ${getBadgeClass(notice.type)}`}>{notice.type}</span>
                    {notice.isNew && <span className="new-badge">NEW</span>}
                  </div>
                  <div className="col-title">
                    <span className="title-text">{notice.title}</span>
                  </div>
                  <div className="col-date">{notice.date}</div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                조건에 맞는 공지사항이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Footer / Pagination */}
        <div className="notice-footer">
          <div className="total-count">총 {filteredAndSortedData.length}건</div>
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
  )
}
