import { Link } from 'react-router-dom';
import './Footer.scss';
import { IconPin, IconFax, IconPhone, IconMail } from './icons'

interface FootCol {
  title: string
  links: { label: string, path: string }[]
}
const footCols: FootCol[] = [
  { 
    title: '허브소개', 
    links: [
      { label: '센터장 인사말', path: '/about/message' }, 
      { label: '인프라 및 시스템', path: '/about/infrastructure' }, 
      { label: '오시는 길', path: '/about/location' }, 
      { label: '회사연혁', path: '/about/history' }
    ] 
  },
  { 
    title: '배송조회', 
    links: [
      { label: '일반운송장조회', path: '/tracking/waybill' }, 
      { label: '우리동네택배함', path: '/tracking/neighborhood' }, 
      { label: '지역집화수거방법', path: '/tracking/pickup' }
    ] 
  },
  { 
    title: '물류상담', 
    links: [
      { label: '상담안내', path: '/consulting/info' }, 
      { label: '상담신청', path: '/consulting/apply' }
    ] 
  },
]

const csLinks = [
  { label: '공지사항', path: '/support/notice' }, 
  { label: '자주묻는질문', path: '/support/faq' }, 
  { label: '파손/분실접수', path: '/support/claim' },
  { label: '1:1 문의', path: '/support/inquiry' }
]

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/Logo.svg" alt="N" style={{ width: '28px', height: 'auto', filter: 'grayscale(100%) brightness(1.2) opacity(0.7)' }} />
              <span>
                <span className="name">NexusHub</span>
                <span className="sub">남양주터미널</span>
              </span>
            </a>
            <p>
              고객의 신뢰를 잇는 스마트 물류 허브,
              <br />
              NexusHub가 함께합니다.
            </p>
            <div className="addr-t">터미널 주소</div>
            <div className="addr">
              <IconPin />경기도 남양주시 진접읍 물류로 123
            </div>
            <div className="addr">
              <IconFax />팩스: 031-XXX-XXXX
            </div>
            <div className="sns">
              <span>
                <IconPhone size={16} />
              </span>
              <span>
                <IconMail size={16} />
              </span>
            </div>
          </div>

          {footCols.map((col) => (
            <div className="foot-col" key={col.title}>
              <h5>{col.title}</h5>
              {col.links.map((link) => (
                <Link to={link.path} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="foot-cs">
            <h5>고객센터</h5>
            {csLinks.map((link) => (
              <Link to={link.path} className="cs-link" key={link.label}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="foot-cs">
            <h5>고객센터</h5>
            <div className="tel">
              <IconPhone />1588-XXXX
            </div>
            <div className="hrs">
              평일 09:00 ~ 18:00
              <br />
              점심 12:00 ~ 13:00 제외
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>Copyright © 2026 NexusHub Namyangju. All rights reserved.</span>
          <div className="links">
            <a href="#">이용약관</a>
            <a href="#">개인정보처리방침</a>
            <a href="#">터미널 오시는 길</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
