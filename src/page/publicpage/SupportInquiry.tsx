import { useState } from 'react';
import { Link } from 'react-router-dom';
import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';
import { 
  Clock, Calendar, Zap, Search, RefreshCw, HelpCircle,
  Edit3, List, ChevronRight
} from 'lucide-react';
import SupportInquiryForm from './SupportInquiryForm';
import SupportInquiryHistory from './SupportInquiryHistory';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import './SupportInquiry.scss';

export default function SupportInquiry() {
  const [activeTab, setActiveTab] = useState<'write' | 'history'>('write');
  const userId = useRequireAuth();

  if (!userId) return null;

  const sidebarWidgets = (
    <>
      <div className="inquiry-sidebar-widget">
        <div className="widget-title">운영 안내</div>
        <div className="info-list">
          <div className="info-item">
            <div className="icon-box blue"><Clock size={16} /></div>
            <div className="text-box">
              <div className="label">답변 시간</div>
              <div className="desc">평일 09:00 ~ 18:00</div>
            </div>
          </div>
          <div className="info-item">
            <div className="icon-box green"><Calendar size={16} /></div>
            <div className="text-box">
              <div className="label">주말/공휴일</div>
              <div className="desc">익일 영업일 처리</div>
            </div>
          </div>
          <div className="info-item">
            <div className="icon-box orange"><Zap size={16} /></div>
            <div className="text-box">
              <div className="label">긴급 문의</div>
              <div className="desc">전화 1588-XXXX</div>
            </div>
          </div>
        </div>
      </div>

      <div className="inquiry-sidebar-widget">
        <div className="widget-title">빠른 도움말</div>
        <div className="link-list">
          <Link to="/tracking/waybill" className="link-item">
            <div className="link-left"><Search size={16} /> 배송 조회</div>
            <ChevronRight size={16} className="link-icon" />
          </Link>
          <Link to="/support/faq" className="link-item">
            <div className="link-left"><RefreshCw size={16} /> 반품 안내</div>
            <ChevronRight size={16} className="link-icon" />
          </Link>
          <Link to="/support/faq" className="link-item">
            <div className="link-left"><HelpCircle size={16} /> 자주 묻는 질문</div>
            <ChevronRight size={16} className="link-icon" />
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <SubPageLayout 
      heroTitle="1:1 문의"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '고객센터' },
        { label: '1:1 문의' }
      ]}
      sidebarData={sidebarData.support}
      sidebarExtra={sidebarWidgets}
    >
      <div className="support-inquiry">
        
        <div className="tabs">
          <button className={activeTab === 'write' ? 'active' : ''} onClick={() => setActiveTab('write')}>
            <Edit3 size={18} /> 문의 작성
          </button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>
            <List size={18} /> 내 문의 내역
          </button>
        </div>

        {activeTab === 'write' ? (
          <SupportInquiryForm />
        ) : (
          <SupportInquiryHistory />
        )}

      </div>
    </SubPageLayout>
  );
}
