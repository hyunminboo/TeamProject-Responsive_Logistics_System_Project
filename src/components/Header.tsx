import './Header.scss';
import { IconUser, IconLock } from './icons'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

import { Link } from 'react-router-dom'
import { menus } from '../data/menuData'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { userId, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getDashboardUrl = () => {
    let url = import.meta.env.VITE_DASHBOARD_URL || 'https://team-project-nexus-hub-dashboard.vercel.app/admin/login';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    // 기본 도메인만 입력된 경우 로그인 경로 추가
    if (url.endsWith('.app') || url.endsWith('.app/')) {
      url = url.replace(/\/$/, '') + '/admin/login';
    }
    return url;
  };

  return (
    <header className={`${isScrolled ? 'scrolled' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <span className="mark">
              <img src="/Logo.svg" alt="NexusHub Logo" />
            </span>
            <span>
              <span className="name">NexusHub</span>
              <span className="sub">남양주 터미널</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <ul className="nav-menu">
            {menus.map((menuItem) => (
              <li key={menuItem.title} className="nav-item">
                <Link to={menuItem.path} className="nav-link">{menuItem.title}</Link>
                <div className="dropdown-wrapper">
                  <ul className="dropdown">
                    {menuItem.sub.map((subItem) => (
                      <li key={subItem.label}>
                        <Link to={subItem.path}>{subItem.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            {userId ? (
              <a onClick={logout} className="login" style={{ cursor: 'pointer' }}>
                <IconUser />로그아웃
              </a>
            ) : (
              <Link to="/login" className="login">
                <IconUser />로그인
              </Link>
            )}
            <a href={getDashboardUrl()} className="staff">
              <IconLock />직원 로그인
            </a>
            
            {/* Hamburger Toggle */}
            <button className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              {isMobileOpen ? <X size={28} color="#fff" /> : <Menu size={28} color="#fff" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {menus.map(menuItem => (
            <div key={menuItem.title} className="mobile-nav-group">
              <h4>{menuItem.title}</h4>
              <ul>
                {menuItem.sub.map(subItem => (
                  <li key={subItem.label}>
                    <Link to={subItem.path} onClick={() => setIsMobileOpen(false)}>{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mobile-nav-footer">
            {userId ? (
              <a onClick={() => { logout(); setIsMobileOpen(false); }} className="mobile-login" style={{ cursor: 'pointer' }}>
                <IconUser />로그아웃
              </a>
            ) : (
              <Link to="/login" className="mobile-login" onClick={() => setIsMobileOpen(false)}>
                <IconUser />로그인
              </Link>
            )}
            <a href={getDashboardUrl()} className="mobile-staff" onClick={() => setIsMobileOpen(false)}>
              <IconLock />직원 로그인
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
