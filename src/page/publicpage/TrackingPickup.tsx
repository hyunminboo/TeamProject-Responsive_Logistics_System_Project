import SubPageLayout from '../../components/SubPageLayout';
import { sidebarData } from '../../data/sidebarData';
import { Package, Truck, CheckSquare } from 'lucide-react';
import './TrackingPickup.scss';

export default function TrackingPickup() {
  const summaryData = [
    { id: 'waiting', label: '수거 대기', count: 90, percent: 7, color: 'yellow', icon: <Package size={22} /> },
    { id: 'progress', label: '수거 진행 중', count: 500, percent: 40, color: 'blue', icon: <Truck size={22} /> },
    { id: 'completed', label: '터미널 입고 완료', count: 660, percent: 53, color: 'green', icon: <CheckSquare size={22} /> },
  ];

  const listData = [
    { id: 1, name: '진접 금곡산업단지', sub: '가구/물류 공장 밀집 구역', progress: 100, count: 450, driver: '김철수', driverInitial: '김', status: '입고 완료', statusColor: 'green' },
    { id: 2, name: '오남 중앙상가', sub: '의류/도소매 상가 밀집 구역', progress: 65, count: 320, driver: '이영호', driverInitial: '이', status: '수거 중', statusColor: 'blue' },
    { id: 3, name: '별내 카페거리', sub: '카페/베이커리 부자재 반품', progress: 30, count: 180, driver: '박지성', driverInitial: '박', status: '수거 중', statusColor: 'blue' },
    { id: 4, name: '퇴계원 상점가', sub: '소규모 점포 수거 밀집 구역', progress: 0, count: 90, driver: '최동훈', driverInitial: '최', status: '수거 대기', statusColor: 'yellow' },
    { id: 5, name: '다산 현대프리미엄아울렛', sub: '대형 쇼핑몰 입점 매장', progress: 100, count: 210, driver: '정우성', driverInitial: '정', status: '입고 완료', statusColor: 'green' },
  ];

  return (
    <SubPageLayout 
      heroTitle="지역집화(수거)현황"
      breadcrumbs={[
        { label: '홈', path: '/' },
        { label: '배송조회' },
        { label: '지역집화(수거)현황' }
      ]}
      sidebarData={sidebarData.tracking}
    >
      <div className="tracking-pickup">
        <div className="tracking-box">          <div className="summary-cards">
            {summaryData.map(data => (
              <div key={data.id} className={`summary-card ${data.color}`}>
                <div className={`card-icon ${data.color}`}>
                  {data.icon}
                </div>
                <div className="card-info">
                  <div className="card-label">{data.label}</div>
                  <div className="card-count">
                    {data.count}<span>건</span>
                  </div>
                </div>
                <div className="card-percent">{data.percent}%</div>
              </div>
            ))}
          </div>          <div className="pickup-list-container">
            <div className="list-header">
              <div className="list-title">
                실시간 구역별 집화 현황
                <div className="live-badge">LIVE</div>
              </div>
              <button className="refresh-btn">새로고침</button>
            </div>

            <div className="pickup-list">
              <div className="list-columns">
                <div className="col-header">구역 및 상가명</div>
                <div className="col-header">수거 진행률</div>
                <div className="col-header">요청 건수</div>
                <div className="col-header">담당 SM (기사)</div>
                <div className="col-header">현재 상태</div>
              </div>

              <div className="list-body">
                {listData.map(item => (
                  <div key={item.id} className="pickup-item">
                    <div className="col-area">
                      <div className="area-name">{item.name}</div>
                      <div className="area-sub">{item.sub}</div>
                    </div>
                    <div className="col-progress">
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${item.statusColor}`} 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <div className={`progress-text ${item.statusColor}`}>
                        {item.progress}%
                      </div>
                    </div>
                    <div className="col-count">{item.count}건</div>
                    <div className="col-driver">
                      <div className="driver-initial">{item.driverInitial}</div>
                      <div className="driver-name">{item.driver}</div>
                    </div>
                    <div className="col-status">
                      <div className={`status-badge ${item.statusColor}`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
