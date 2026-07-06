import { useState } from 'react';
import { ChevronDown, Info, Paperclip, Mail, Phone, ExternalLink, Send, MessageSquare } from 'lucide-react';

export default function SupportInquiryForm() {
  const [priority, setPriority] = useState<'일반' | '긴급'>('일반');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsAgree, setSmsAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [files, setFiles] = useState<number[]>([]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setContent(val);
    }
  };

  const handleMockUpload = () => {
    if (files.length < 3) {
      setFiles([...files, files.length + 1]);
    } else {
      alert('최대 3개까지만 첨부할 수 있습니다.');
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !email.trim()) {
      return alert('필수 항목(*표시)을 모두 입력해주세요.');
    }
    if (!privacyAgree) {
      return alert('개인정보 수집 및 이용에 동의해주세요.');
    }
    alert('문의가 정상적으로 접수되었습니다. 담당자 확인 후 답변을 드릴 예정입니다.');
  };

  return (
    <div className="inquiry-form-card">
      <div className="card-header">
        <div className="icon-box">
          <MessageSquare size={24} color="#3b82f6" />
        </div>
        <div className="title-text">
          <h3>문의 내용 작성</h3>
          <p>정확한 정보를 입력하실수록 빠르고 정확한 답변을 드릴 수 있습니다.</p>
        </div>
      </div>

      <div className="row-split">
        <div className="form-group">
          <label>문의 유형 <span className="required">*</span></label>
          <div className="select-wrapper">
            <select>
              <option>배송 지연 문의</option>
              <option>상품 파손 문의</option>
              <option>기타 문의</option>
            </select>
            <ChevronDown size={18} className="select-icon" />
          </div>
          <div className="helper-text"><Info size={14} /> 해당 유형을 선택하시면 빠른 담당자 배정이 가능합니다</div>
        </div>
        
        <div className="form-group priority-group">
          <label>우선순위</label>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button 
              className={priority === '일반' ? 'active' : ''} 
              onClick={() => setPriority('일반')}
            >일반</button>
            <button 
              className={priority === '긴급' ? 'active' : ''} 
              onClick={() => setPriority('긴급')}
            >긴급</button>
          </div>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '24px' }}>
        <label>문의 제목 <span className="required">*</span></label>
        <input type="text" placeholder="문의 제목을 간략히 입력해 주세요" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label>문의 내용 <span className="required">*</span></label>
        <textarea 
          placeholder="문의 내용을 상세히 입력해 주세요.&#13;&#10;&#13;&#10;예) 운송장 번호, 발생 날짜, 구체적인 상황 등을 함께 적어주시면 더욱 빠른 처리가 가능합니다."
          rows={6}
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="helper-text"><Info size={14} /> 운송장 번호를 함께 기재하면 빠른 처리에 도움이 됩니다</div>
          <div className="char-count">{content.length} / 1000자</div>
        </div>
      </div>

      <div className="form-group">
        <label>파일 첨부 (선택)</label>
        <div className="upload-area" onClick={handleMockUpload}>
          <Paperclip size={18} />
          <span>파일을 드래그하거나 클릭하여 첨부하세요 • 최대 3개, 각 5MB 이하</span>
        </div>
        {files.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {files.map((f, idx) => (
              <div key={idx} style={{ padding: '8px 12px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Paperclip size={14} color="#64748b" /> 첨부파일_{f}.png
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-title">
        <MessageSquare size={18} color="#64748b" /> 연락처 정보
      </div>

      <div className="contact-row">
        <div className="form-group">
          <label>이메일 주소 <span className="required">*</span></label>
          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input type="text" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="helper-text"><Info size={14} /> 답변 결과를 이메일로 받으실 수 있습니다</div>
        </div>
        <div className="form-group">
          <label>휴대폰 번호</label>
          <div className="input-wrapper">
            <Phone size={18} className="input-icon" />
            <input type="text" placeholder="010-0000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <label className="checkbox-label" style={{ marginTop: '8px' }}>
            <input type="checkbox" checked={smsAgree} onChange={e => setSmsAgree(e.target.checked)} />
            답변 SMS 알림 수신 동의
          </label>
        </div>
      </div>

      <div className="form-footer">
        <div className="left-actions">
          <label className="checkbox-label primary">
            <input type="checkbox" checked={privacyAgree} onChange={e => setPrivacyAgree(e.target.checked)} />
            개인정보 수집 및 이용에 동의합니다
          </label>
          <a href="#" className="privacy-link">개인정보처리방침 확인하기 <ExternalLink size={14} /></a>
        </div>
        <div className="right-actions">
          <button className="btn-draft" onClick={() => alert('임시 저장되었습니다.')}>임시 저장</button>
          <button className="btn-submit" onClick={handleSubmit}><Send size={18} /> 문의 접수하기</button>
        </div>
      </div>
    </div>
  );
}
