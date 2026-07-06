import { useState } from 'react';
import { List, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userData } from '../../data/userData';
import SupportInquiryDetail from './SupportInquiryDetail';

export default function SupportInquiryHistory() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { userId } = useAuth();
  const inquiryHistoryData = userId ? userData[userId]?.inquiries || [] : [];

  if (selectedId) {
    return <SupportInquiryDetail id={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="recent-inquiries">
      <div className="header">
        <h4><List size={18} color="#64748b" /> 내 문의 내역</h4>
      </div>
      <div className="inquiry-list">
        {inquiryHistoryData.map((item) => (
          <div className="inquiry-item" key={item.id} onClick={() => setSelectedId(item.id)} style={{ cursor: 'pointer' }}>
            <div className="item-info">
              <span className={`badge ${item.status === '답변완료' ? 'completed' : 'processing'}`}>
                {item.status}
              </span>
              <div className="details">
                <h5>{item.title}</h5>
                <p>접수번호 {item.id} • {item.date}</p>
              </div>
            </div>
            <button className="btn-view">
              {item.status === '답변완료' ? '답변 보기' : '상세 보기'} <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
