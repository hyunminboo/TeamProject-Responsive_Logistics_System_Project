import { useState } from 'react';
import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';
import { FileText, Image as ImageIcon, CheckCircle, Info, ChevronDown, Search } from 'lucide-react';
import { useRequireAuth } from '../../hooks/useRequireAuth';
import './SupportClaim.scss';

export default function SupportClaim() {
  const userId = useRequireAuth();
  
  const [trackingNum, setTrackingNum] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [photos, setPhotos] = useState<number[]>([]);

  if (!userId) return null;

  const handleVerify = () => {
    if (trackingNum.trim().length > 0) {
      setIsVerified(true);
    } else {
      alert('운송장 번호를 입력해주세요.');
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500) {
      setContent(val);
    }
  };

  const handleMockUpload = () => {
    if (photos.length < 5) {
      setPhotos([...photos, photos.length + 1]);
    } else {
      alert('최대 5장까지만 첨부할 수 있습니다.');
    }
  };

  const handleSubmit = () => {
    if (!isVerified) return alert('운송장 번호를 조회하여 확인해주세요.');
    if (!name.trim()) return alert('접수자 성명을 입력해주세요.');
    if (!phone.trim()) return alert('연락처를 입력해주세요.');
    if (!content.trim()) return alert('피해 상세 내용을 입력해주세요.');
    if (photos.length === 0) return alert('피해 사진을 최소 1장 이상 첨부해주세요.');
    if (!isAgreed) return alert('개인정보 수집 및 이용에 동의해주세요.');

    alert('✅ 클레임이 정상적으로 접수되었습니다. (영업일 기준 3~5일 소요)');
  };

  const sidebarWarning = (
    <div className="claim-sidebar-warning">
      <h4><Info size={16} /> 접수 전 확인사항</h4>
      <ul>
        <li>배송 완료 후 7일 이내 접수</li>
        <li>파손 사진은 필수 첨부 항목</li>
        <li>처리기간 영업일 기준 3~5일</li>
      </ul>
    </div>
  );

  return (
    <SubPageLayout 
      heroTitle="파손/분실 접수"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '고객센터' },
        { label: '파손/분실 접수' }
      ]}
      sidebarData={sidebarData.support}
      sidebarExtra={sidebarWarning}
    >
      <div className="support-claim">
        <div className="claim-header">
          <div className="icon-box">
            <FileText size={24} color="#3b82f6" />
          </div>
          <div className="title-text">
            <h3>클레임 접수서 작성</h3>
            <p>아래 양식을 빠짐없이 작성해 주세요. 정확한 정보 입력이 빠른 처리에 도움이 됩니다.</p>
          </div>
        </div>

        <div className="claim-form">
          <div className="form-row split">
            <div className="form-group">
              <label>운송장 번호 <span className="required">*</span></label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  placeholder="운송장 번호를 입력하세요 (예: 1234-5678-9012)" 
                  value={trackingNum}
                  onChange={(e) => {
                    setTrackingNum(e.target.value);
                    setIsVerified(false); // 재입력 시 초기화
                  }}
                />
                <button className="btn-search" onClick={handleVerify}>
                  <Search size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '4px' }} /> 조회
                </button>
              </div>
              
              {isVerified && (
                <div className="success-box">
                  <CheckCircle size={16} />
                  <span>확인됨 — [홍길동 고객님] 2025.12.08 부산 허브터미널 → 서울 마곡센터</span>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>접수 유형 <span className="required">*</span></label>
              <div className="select-wrapper">
                <select>
                  <option>파손 접수</option>
                  <option>분실 접수</option>
                </select>
                <ChevronDown size={18} className="select-icon" />
              </div>
            </div>
          </div>

          <div className="form-row split">
            <div className="form-group">
              <label>접수자 성명 <span className="required">*</span></label>
              <input type="text" placeholder="성명을 입력하세요" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>연락처 <span className="required">*</span></label>
              <input type="text" placeholder="010-0000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>피해 상세 내용 <span className="required">*</span></label>
            <textarea 
              placeholder="피해 또는 분실 상황을 최대한 구체적으로 설명해 주세요.&#13;&#10;예) 박스 외형은 정상이었으나 내부 제품이 파손되어 있었음, 제품명: OO, 구매가: OO원"
              rows={5}
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <div className="char-count">{content.length} / 500자</div>
          </div>

          <div className="form-group">
            <label>피해 사진 첨부 <span className="required">*</span> <span className="sub-label">(최대 5장, jpg/png/heic, 각 10MB 이하)</span></label>
            <div className="upload-area" onClick={handleMockUpload}>
              <div className="upload-content">
                <ImageIcon size={32} color="#94a3b8" />
                <p className="upload-title">사진을 여기에 드래그하거나 클릭하여 업로드</p>
                <p className="upload-desc">파손된 부위, 박스 외형, 내용물 상태를 모두 촬영해 주세요</p>
                <button className="btn-upload">↑ 파일 선택</button>
              </div>
            </div>
            
            {photos.length > 0 && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {photos.map((_, idx) => (
                  <div key={idx} style={{ padding: '4px', border: '1px solid #e2e8f0', borderRadius: '8px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', position: 'relative' }}>
                    <ImageIcon size={20} color="#94a3b8" />
                  </div>
                ))}
                {photos.length < 5 && (
                  <div className="preview-item add-more" onClick={handleMockUpload}>
                    +
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-section-title">환불 계좌 정보</div>
          <div className="form-row triple">
            <div className="form-group">
              <label>은행 선택</label>
              <div className="select-wrapper">
                <select>
                  <option>은행을 선택하세요</option>
                  <option>국민은행</option>
                  <option>신한은행</option>
                  <option>우리은행</option>
                </select>
                <ChevronDown size={18} className="select-icon" />
              </div>
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <label>계좌번호</label>
              <input type="text" placeholder="계좌번호를 입력하세요 (- 제외)" />
            </div>
            <div className="form-group">
              <label>예금주명</label>
              <input type="text" placeholder="예금주" />
            </div>
          </div>
          <div className="warning-box">
            <Info size={16} />
            <span>환불 계좌는 접수자 본인 명의 계좌만 등록 가능합니다. 타인 명의 계좌는 처리가 지연될 수 있습니다.</span>
          </div>

          <div className="form-section-title">개인정보 수집 및 이용 동의</div>
          <div className="privacy-box">
            NexusHub 남양주터미널은 보상 처리를 위해 접수자 성명, 연락처, 계좌정보를 수집합니다. 수집된 정보는 클레임 처리 완료 후 파기됩니다.
          </div>
          <label className="checkbox-label">
            <input type="checkbox" checked={isAgreed} onChange={e => setIsAgreed(e.target.checked)} />
            <span>개인정보 수집 및 이용에 동의합니다 (필수)</span>
          </label>

          <div className="form-actions">
            <button className="btn-cancel">취소</button>
            <div className="right-actions">
              <button className="btn-draft" onClick={() => alert('임시 저장되었습니다.')}>임시 저장</button>
              <button className="btn-submit" onClick={handleSubmit}>클레임 접수하기</button>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
