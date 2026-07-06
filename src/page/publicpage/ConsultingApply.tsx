import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SubPageLayout from "../../components/SubPageLayout";
import { sidebarData } from "../../data/sidebarData";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import "./ConsultingApply.scss";

type ConsultType = "pickup" | "corporate" | "quote" | "claim" | "other";

const consultTypes: { id: ConsultType; label: string }[] = [
  { id: "pickup", label: "정기 집화(픽업)" },
  { id: "corporate", label: "기업 물류 제휴" },
  { id: "quote", label: "단가/견적 문의" },
  { id: "claim", label: "파손·분실 보상" },
  { id: "other", label: "기타 문의" },
];

const validTypes: ConsultType[] = [
  "pickup",
  "corporate",
  "quote",
  "claim",
  "other",
];

const regionOptions = ["남양주시", "구리시", "양평군", "가평군", "하남시"];
const volumeOptions = ["50개 미만", "50~200개", "200~500개", "500개 이상"];

const ConsultSteps = () => (
  <div className="consult-steps">
    <h3 className="consult-steps__title">상담 진행 절차</h3>
    <ul className="consult-steps__list">
      {[
        {
          title: "온라인/전화 상담 신청",
          desc: "필요한 분야와 연락처를 남겨 주세요.",
        },
        {
          title: "전담 매니저 배정",
          desc: "권역 담당 매니저가 1일 내 연락드립니다.",
        },
        {
          title: "맞춤 견적·솔루션 제안",
          desc: "물량·권역에 맞는 맞춤안을 제안합니다.",
        },
        {
          title: "계약 및 서비스 개시",
          desc: "합의 완료 후 빠르게 시작합니다.",
        },
      ].map((s, i) => (
        <li key={i} className="consult-steps__item">
          <span className="consult-steps__num">{i + 1}</span>
          <div className="consult-steps__text">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
export default function ConsultingApply() {
  const userId = useRequireAuth();
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type") as ConsultType | null;
  const initialType: ConsultType =
    typeParam && validTypes.includes(typeParam) ? typeParam : "pickup";

  const [selectedType, setSelectedType] = useState<ConsultType>(initialType);
  const [agreed, setAgreed] = useState(false);
  
  if (!userId) return null;
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    region: "",
    volume: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    alert("상담 싀청을 접수되었습니다. 영업일 1일 내 연락드리겠습니다.");
  };

  return (
    <SubPageLayout
      heroTitle="상담신청"
      heroDesc="기업·동네 상인을 위한 1:1 물류 상담 — 정기 집화부터 기업 제휴, 단기 견적까지"
      breadcrumbs={[
        { label: "홈", path: "/" },
        { label: "물류상담" },
        { label: "상담신청" },
      ]}
      sidebarData={sidebarData.consulting}
      sidebarExtra={<ConsultSteps />}
    >
      <div className="consulting-apply">
        <div className="ca-header">
          <h2 className="ca-header__title">상담 신청</h2>
          <p className="ca-header__desc">
            아래 내용을 남겨 주시면 전담 매니저가 1일 내 연락드립니다. 상담은
            100% 무료입니다.
          </p>
        </div>

        {/* 상담 분야 */}
        <div className="ca-field">
          <label className="ca-label">상담 분야</label>
          <div className="ca-type-group">
            {consultTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`ca-type-btn ${selectedType === t.id ? "active" : ""}`}
                onClick={() => setSelectedType(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 폼 그리드 */}
        <div className="ca-grid">
          <div className="ca-field">
            <label className="ca-label">
              담당자 성함 <span className="required">*</span>
            </label>
            <input
              className="ca-input"
              name="name"
              placeholder="홍길동"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="ca-field">
            <label className="ca-label">회사 / 상호명</label>
            <input
              className="ca-input"
              name="company"
              placeholder="(주)넥서스상회"
              value={form.company}
              onChange={handleChange}
            />
          </div>
          <div className="ca-field">
            <label className="ca-label">
              연락처 <span className="required">*</span>
            </label>
            <input
              className="ca-input"
              name="phone"
              placeholder="010-0000-0000"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="ca-field">
            <label className="ca-label">이메일</label>
            <input
              className="ca-input"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="ca-field">
            <label className="ca-label">관할 권역</label>
            <select
              className="ca-input"
              name="region"
              value={form.region}
              onChange={handleChange}
            >
              <option value="">선택해 주세요</option>
              {regionOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="ca-field">
            <label className="ca-label">월 예상 물량</label>
            <select
              className="ca-input"
              name="volume"
              value={form.volume}
              onChange={handleChange}
            >
              <option value="">선택해 주세요</option>
              {volumeOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 상담 내용 */}
        <div className="ca-field">
          <label className="ca-label">상담 내용</label>
          <textarea
            className="ca-textarea"
            name="content"
            placeholder="현재 물류 상황, 필요한 서비스, 희망 일정 등을 자유롭게 적어 주세요."
            value={form.content}
            onChange={handleChange}
            rows={6}
          />
        </div>

        {/* 개인정보 동의 */}
        <label className="ca-agree">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>
            개인정보 수집·이용에 동의합니다. 수집된 정보는 상담 용대 목적으로만
            사용되며 처리 후 파기됩니다.
          </span>
        </label>

        {/* 제출 버튼 */}
        <button className="ca-submit" onClick={handleSubmit}>
          상담 신청 접수하기 →
        </button>
      </div>
    </SubPageLayout>
  );
}
