import SubPageLayout from "../../components/SubPageLayout";
import { Link } from "react-router-dom";
import { sidebarData } from "../../data/sidebarData";
import "./ConsultingInfo.scss";

const consultingCards = [
  {
    tag: "동네 상인/기업",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    title: "정기 집화(픽업) 상담",
    desc: "과수원, 농가게, 공장 등 매일 정기적인 수거가 필요한 사업장을 위한 맞춤 단가 상담입니다.",
    path: "/consulting/apply?type=pickup",
  },
  {
    tag: "기업 전용",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "기업 물류 제휴·위탁",
    desc: "진접·오남·별내 권역 배송량과 상하차 인력을 연계한 기업 단위 물류 위탁 제유를 제안드립니다.",
    path: "/consulting/apply?type=corporate",
  },
  {
    tag: "견적 안내",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "택배 단가·견적 문의",
    desc: "물량과 권역에 따른 합리적인 택배 단가표와 맞춤 견적을 빠르게 안내 드립니다.",
    path: "/consulting/apply?type=quote",
  },
  {
    tag: "고객 CS",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: "파손·분실 보상 상담",
    desc: "배송 중 문제가 발생했나요? 남양주터미널 전담 CS팀이 보상 절차를 빠르게 안내 드립니다.",
    path: "/consulting/apply?type=claim",
  },
];

const stats = [
  { label: "일 평균 처리 물량", value: "18,520건" },
  { label: "가용 배송 차량", value: "90대", highlight: false },
  { label: "당일 출고 완료율", value: "98.5%", highlight: true },
  { label: "관할 권역", value: "5개" },
];

export default function ConsultingInfo() {
  return (
    <SubPageLayout
      heroTitle="상담안내"
      heroDesc="기업·동네 상인을 위한 1:1 물류 상담 — 정기 집화부터 기업 제휴, 단기 견적까지"
      breadcrumbs={[
        { label: "홈", path: "/" },
        { label: "물류상담" },
        { label: "상담안내" },
      ]}
      sidebarData={sidebarData.consulting}
    >
      <div className="consulting-info">
        {/* 상단 설명 */}
        <div className="ci-intro">
          <h2 className="ci-intro__title">상담 안내</h2>
          <p className="ci-intro__desc">
            남양주터미널 전담 매니저가 진접·오남·별내 권역에 꼭 맞는 물류
            솔루션을 1:1로 설계해 드립니다. 아래에서 필요한 분야를 선택하면 신청
            폼에 자동으로 반영됩니다. 상담과 견적은 100% 무료입니다.
          </p>
          <div className="ci-intro__badges">
            <span>✓ 영업일 1일 내 최신</span>
            <span>✓ 계약 의무 없는 무료 견적</span>
            <span>✓ 소규모 사업장 환영</span>
          </div>
        </div>

        {/* 상담 분야 카드 */}
        <h3 className="ci-section-title">상담 분야</h3>
        <div className="ci-cards">
          {consultingCards.map((card) => (
            <Link to={card.path} key={card.title} className="ci-card">
              <div className="ci-card__top">
                <div className="ci-card__icon">{card.icon}</div>
                <span className="ci-card__tag">{card.tag}</span>
              </div>
              <h4 className="ci-card__title">{card.title}</h4>
              <p className="ci-card__desc">{card.desc}</p>
              <div className="ci-card__arrow">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 통계 배너 */}
        <div className="ci-stats">
          <div className="ci-stats__label">
            <span className="ci-stats__badge">🔗 NexusHub 물류 네트워크</span>
            <h4>남양주 전역을 잇는 라스트마일 인프라</h4>
          </div>
          <div className="ci-stats__grid">
            {stats.map((s) => (
              <div className="ci-stats__item" key={s.label}>
                <span className="ci-stats__label-sm">{s.label}</span>
                <strong className={s.highlight ? "highlight" : ""}>
                  {s.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  );
}
