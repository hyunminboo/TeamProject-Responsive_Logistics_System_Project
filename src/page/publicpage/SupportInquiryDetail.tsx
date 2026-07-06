import { ArrowLeft, User, Headphones } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { userData } from '../../data/userData';

interface SupportInquiryDetailProps {
  id: string;
  onBack: () => void;
}

export default function SupportInquiryDetail({ id, onBack }: SupportInquiryDetailProps) {
  const { userId } = useAuth();
  const userInquiries = userId ? userData[userId]?.inquiries || [] : [];
  const data = userInquiries.find(item => item.id === id);

  if (!data) return null;

  return (
    <div className="inquiry-detail">
      <button className="btn-back" onClick={onBack}>
        <ArrowLeft size={16} /> 목록으로
      </button>

      <div className="detail-header">
        <div className="title-row">
          <span className={`badge ${data.status === '답변완료' ? 'completed' : 'processing'}`}>
            {data.status}
          </span>
          <h3>{data.title}</h3>
        </div>
        <div className="meta-row">
          <span>접수번호 {data.id}</span>
          <span>작성일 {data.date}</span>
        </div>
      </div>

      <div className="detail-body">
        <div className="qna-block question">
          <div className="avatar">
            <User size={20} color="#64748b" />
          </div>
          <div className="content-box">
            <p>{data.question.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
          </div>
        </div>

        {data.status === '답변완료' && data.answer && (
          <div className="qna-block answer">
            <div className="avatar">
              <Headphones size={20} color="#3b82f6" />
            </div>
            <div className="content-box">
              <div className="answer-header">
                <strong>넥서스허브 고객센터</strong>
                <span className="date">{data.answerDate}</span>
              </div>
              <p>{data.answer.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="detail-footer">
        <button className="btn-bottom-back" onClick={onBack}>목록으로 돌아가기</button>
      </div>
    </div>
  );
}
