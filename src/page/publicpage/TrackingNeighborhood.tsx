import { useState } from 'react';
import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';

import './TrackingNeighborhood.scss';

export default function TrackingNeighborhood() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = [
    { name: '오남읍', status: '지연', desc: '물량 폭주로 +1일 소요', isDelay: true, angle: -35, distance: 130, textPosition: 'bottom' },
    { name: '화도읍', status: '원활', desc: '정상 배송 중', isDelay: false, angle: 15, distance: 140, textPosition: 'top' },
    { name: '다산동', status: '원활', desc: '정상 배송 중', isDelay: false, angle: 75, distance: 120, textPosition: 'bottom' },
    { name: '별내동', status: '원활', desc: '정상 배송 중', isDelay: false, angle: 145, distance: 130, textPosition: 'bottom' },
    { name: '퇴계원읍', status: '원활', desc: '정상 배송 중', isDelay: false, angle: 195, distance: 120, textPosition: 'top' },
  ];
  const filteredRegions = regions.filter(r => r.name.includes(searchQuery));



  return (
    <SubPageLayout 
      heroTitle="우리 동네 택배 현황"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '배송조회' },
        { label: '우리 동네 택배 현황' }
      ]}
      sidebarData={sidebarData.tracking}
    >
      <div className="tracking-neighborhood">
        <div className="tracking-box summary-stats">
          <div className="stat-item">
            <div className="stat-label">관할 구역</div>
            <div className="stat-value black">15<span className="unit">곳</span></div>
          </div>
          <div className="stat-item">
            <div className="stat-label">원활 (정상 배송)</div>
            <div className="stat-value green">14<span className="unit">곳</span></div>
          </div>
          <div className="stat-item">
            <div className="stat-label">지연 (주의)</div>
            <div className="stat-value red">1<span className="unit">곳</span></div>
          </div>
          <div className="stat-item">
            <div className="stat-label">최근 업데이트 시간</div>
            <div className="stat-value blue">오늘 14:30</div>
          </div>
        </div>
        <div className="tracking-box detail-section">
          <h3 className="section-title">지역별 상세 현황</h3>
          
          <div className="detail-content">
            <div className="region-list-pane">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input 
                  type="text" 
                  placeholder="읍/면/동 이름을 검색하세요" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="region-cards">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((r, idx) => (
                    <div 
                      key={idx} 
                      className={`region-card ${r.isDelay ? 'active-delay' : ''} ${selectedRegion === r.name ? 'selected' : ''}`}
                      onClick={() => setSelectedRegion(r.name)}
                    >
                      <div className="region-name">{r.name}</div>
                      <div className="region-status">
                        <span className={`dot ${r.isDelay ? 'red' : 'green'}`}></span>
                        <span className={`status-text ${r.isDelay ? 'red' : 'green'}`}>{r.status}</span>
                        <span className="status-desc">{r.desc}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', fontSize: '13px' }}>
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </div>
            <div className="map-pane">
              <div className="diagram-container">
                <div className="diagram-blob"></div>
                {regions.map((r, idx) => (
                  <div key={`line-${idx}`} className="line" style={{ transform: `rotate(${r.angle}deg)`, width: `${r.distance}px` }}></div>
                ))}
                <div className="center-node">
                  <div className="node-name center-name">진접읍 (허브)</div>
                  <div className="halo-dot green" style={{ width: '22px', height: '22px', background: '#1cc661' }}></div>
                </div>
                {regions.map((r, idx) => (
                  <div 
                    key={`node-${idx}`} 
                    className="outer-node"
                    style={{ 
                      left: '50%', top: '50%',
                      transform: `rotate(${r.angle}deg) translateX(${r.distance}px) rotate(${-r.angle}deg) translate(-50%, -50%)`
                    }}
                  >
                    <div className="node-circle">
                      <div className={`halo-dot ${r.isDelay ? 'red' : 'green'} ${selectedRegion === r.name ? 'ping' : ''}`} style={{ width: '18px', height: '18px', background: r.isDelay ? '#f75555' : '#1cc661' }}></div>
                      {selectedRegion === r.name && (
                        <div className={`tooltip ${r.isDelay ? 'tooltip-red' : 'tooltip-green'}`} style={{ bottom: r.textPosition === 'top' ? 'calc(100% + 36px)' : 'calc(100% + 16px)' }}>
                          <div className="tt-title">
                            <span className="dot" style={{width:'8px',height:'8px',borderRadius:'50%',background: r.isDelay ? '#f75555' : '#1cc661'}}></span>
                            {r.name} <span className="tt-badge">{r.isDelay ? '배송 지연' : '원활'}</span>
                          </div>
                          <div className="tt-desc">{r.desc}</div>
                        </div>
                      )}
                    </div>
                    <div className="node-name" style={{ top: r.textPosition === 'bottom' ? '24px' : 'auto', bottom: r.textPosition === 'top' ? '24px' : 'auto' }}>{r.name}</div>
                  </div>
                ))}
              </div>
              <div className="legend">
                <div className="legend-item">
                  <span className="dot green"></span> 원활 (정상 배송)
                </div>
                <div className="legend-item">
                  <span className="dot red"></span> 지연 (1~2일 소요)
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </SubPageLayout>
  )
}
