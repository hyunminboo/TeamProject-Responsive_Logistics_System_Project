import { useState } from 'react';
import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';

import { IconPhone, IconHeadset } from '../../components/icons';
import './TrackingWaybill.scss';

export default function TrackingWaybill() {
  const [inputValue, setInputValue] = useState('');
  const [searchedNumber, setSearchedNumber] = useState('');

  const handleSearch = () => {
    const trimmedVal = inputValue.trim();
    if (!trimmedVal) return;

   
    const isValidFormat = /^\d{4}-\d{4}-\d{4}$/.test(trimmedVal);

    if (!isValidFormat) {
      alert("운송장 번호 형식이 올바르지 않습니다.\n하이픈(-)을 포함한 12자리 숫자를 입력해 주세요.\n(예: 1234-5678-9012)");
      return;
    }

    setSearchedNumber(trimmedVal);
  };
  return (
    <SubPageLayout 
      heroTitle="일반운송장조회"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '배송조회' },
        { label: '일반운송장조회' }
      ]}
      sidebarData={sidebarData.tracking}
    >
      <div className="general-tracking">        <div className="tracking-box">
          <section className="search-section">
          <h3 className="section-title">운송장 번호</h3>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="운송장 번호를 입력하세요 (예: 1234-5678-9012)" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn-search" onClick={handleSearch}>조회하기</button>
          </div>
          <div className="recent-search">
            <span className="label">최근 조회:</span>
            <span className="tag" onClick={() => { setInputValue('1234-5678-9012'); setSearchedNumber('1234-5678-9012'); }}>1234-5678-9012</span>
            <span className="tag" onClick={() => { setInputValue('0987-6543-2100'); setSearchedNumber('0987-6543-2100'); }}>0987-6543-2100</span>
          </div>
        </section>
        </div>        <div className="tracking-box detail-box">
          {!searchedNumber ? (
            <div className="empty-state">
              조회된 운송장 번호가 없습니다.
            </div>
          ) : (
            <>              <section className="status-summary">
                <div className="status-title">
                  <h2>운송장 번호: {searchedNumber}</h2>
                  <span className="badge badge-green">배송 중</span>
                </div>
            <div className="expected-time">예상 도착: 오늘 18:00</div>
          </section>          <section className="info-cards">
            <div className="card">
              <div className="card-label">발송인</div>
              <div className="card-value">김OO (서울 강남)</div>
              <div className="card-desc">쿠팡 남양주 풀필먼트센터<br/>접수 2025.12.09 · 09:14</div>
            </div>
            <div className="card card-blue">
              <div className="card-label">수취인</div>
              <div className="card-value">이OO</div>
              <div className="card-desc">경기 남양주시 진접읍 OO로 123<br/>연락처 끝자리 ***-1234</div>
            </div>
            <div className="card card-yellow">
              <div className="card-label">상품 정보</div>
              <div className="card-value">의류 외 2건</div>
              <div className="card-desc">2.5 kg · 30 x 20 x 15 cm<br/>일반 택배</div>
            </div>
          </section>          <section className="timeline-horizontal-sec">
            <h3 className="section-title">배송 단계</h3>
            <div className="timeline-horizontal">
              <div className="step completed">
                <div className="circle"><span className="check"></span></div>
                <div className="step-name">집화 완료</div>
                <div className="step-time">12/09 09:14<br/>서울 강남 접수</div>
              </div>
              <div className="step completed">
                <div className="circle"><span className="check"></span></div>
                <div className="step-name">허브 입고</div>
                <div className="step-time">12/09 11:30<br/>남양주 터미널</div>
              </div>
              <div className="step completed">
                <div className="circle"><span className="check"></span></div>
                <div className="step-name">분류 완료</div>
                <div className="step-time">12/09 13:45<br/>진접 구역 배정</div>
              </div>
              <div className="step active">
                <div className="circle"><span className="inner-dot"></span></div>
                <div className="step-name">배송 출발</div>
                <div className="step-time active-time">12/09 14:20<br/>배송기사 배정</div>
              </div>
              <div className="step pending">
                <div className="circle"></div>
                <div className="step-name">배송 완료</div>
                <div className="step-time">오늘 18:00 예정</div>
              </div>
            </div>
          </section>          <section className="timeline-vertical-sec">
            <h3 className="section-title">배송 상세 이력</h3>
            <div className="timeline-vertical">
              <div className="history-item">
                <div className="dot"></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="time">12/09 14:20</span>
                    <span className="event">배송 출발</span>
                  </div>
                  <div className="desc">담당 기사: 박OO (진접A 구역)</div>
                </div>
              </div>
              <div className="history-item">
                <div className="dot"></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="time">12/09 13:45</span>
                    <span className="event">분류 완료</span>
                  </div>
                  <div className="desc">남양주 허브 터미널 - 진접읍 배송 구역 배정 완료</div>
                </div>
              </div>
              <div className="history-item">
                <div className="dot"></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="time">12/09 11:30</span>
                    <span className="event">허브 입고</span>
                  </div>
                  <div className="desc">경기 남양주시 진접읍 NexusHub 터미널 입고</div>
                </div>
              </div>
              <div className="history-item">
                <div className="dot"></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="time">12/09 09:52</span>
                    <span className="event">간선 이동 중</span>
                  </div>
                  <div className="desc">서울 강남 집하장 → 남양주 허브 터미널 이동</div>
                </div>
              </div>
              <div className="history-item last">
                <div className="dot"></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="time">12/09 09:14</span>
                    <span className="event">집화 완료</span>
                  </div>
                  <div className="desc">쿠팡 남양주 풀필먼트센터 접수 - 서울 강남 출고</div>
                </div>
              </div>
            </div>
          </section>          <section className="action-banners">
            <div className="banner-card">
              <div className="banner-info">
                <IconPhone size={20} />
                <div>
                  <strong>배송 완료 알림 SMS 신청</strong>
                  <p>도착 30분 전 문자로 알려드립니다</p>
                </div>
              </div>
              <button className="btn-blue">신청</button>
            </div>
            <div className="banner-card">
              <div className="banner-info">
                <IconHeadset size={20} />
                <div>
                  <strong>배송 문의 1:1 고객센터</strong>
                  <p>파손·분실·지연 등 접수 가능</p>
                </div>
              </div>
              <button className="btn-red">연결</button>
            </div>
          </section>
            </>
          )}
        </div>
      </div>
    </SubPageLayout>
  )
}
