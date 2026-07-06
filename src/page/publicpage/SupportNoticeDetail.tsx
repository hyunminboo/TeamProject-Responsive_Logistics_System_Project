import { useParams, useNavigate } from 'react-router-dom';
import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';
import { noticeData } from '../../data/noticeData';
import { ChevronLeft } from 'lucide-react';
import './SupportNoticeDetail.scss';

export default function SupportNoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // noticeData에서 id와 일치하는 데이터 찾기
  const notice = noticeData.find(item => String(item.id) === id);

  if (!notice) {
    return (
      <SubPageLayout 
        heroTitle="공지사항" 
        breadcrumbs={[
          { label: '홈', path: '/' }, 
          { label: '고객센터', path: '/support/notice' }, 
          { label: '공지사항' }
        ]} 
        sidebarData={sidebarData.support}
      >
        <div className="support-notice-detail">
          <div className="error-msg">존재하지 않는 공지사항입니다.</div>
          <div className="detail-footer">
            <button className="btn-list" onClick={() => navigate('/support/notice')}>
              <ChevronLeft size={18} /> 목록으로 돌아가기
            </button>
          </div>
        </div>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout 
      heroTitle="공지사항"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '고객센터', path: '/support/notice' },
        { label: '공지사항' }
      ]}
      sidebarData={sidebarData.support}
    >
      <div className="support-notice-detail">
        <div className="detail-header">
          <div className="type-badge">{notice.type}</div>
          <h2>{notice.title}</h2>
          <div className="meta-info">
            <span className="author">작성자: {notice.author}</span>
            <span className="date">등록일: {notice.date}</span>
          </div>
        </div>
        
        <div className="detail-content">
          {/* white-space: pre-wrap을 통해 텍스트 내의 \n 기호를 실제 줄바꿈으로 렌더링합니다 */}
          {notice.content}
        </div>
        
        <div className="detail-footer">
          <button className="btn-list" onClick={() => navigate('/support/notice')}>
            <ChevronLeft size={18} /> 목록으로
          </button>
        </div>
      </div>
    </SubPageLayout>
  );
}
