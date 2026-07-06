import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Login.scss';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(userId, password);
    if (success) {
      navigate(-1);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      
      <div className="login-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          홈으로 돌아가기
        </button>

        <div className="login-card">
          <div className="login-header">
            <h1 className="logo-text">Nexus<span>Hub</span></h1>
            <p className="welcome-text">넥서스허브에 오신 것을 환영합니다.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>아이디</label>
              <div className="input-wrapper">
                <User size={20} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="input-group">
              <label>비밀번호</label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
                <span className="checkbox-text">로그인 상태 유지</span>
              </label>
              <button 
                type="button" 
                className="text-btn"
                onClick={() => alert('비밀번호 찾기 페이지는 준비 중입니다.')}
              >
                비밀번호 찾기
              </button>
            </div>

            <button type="submit" className="login-submit-btn">
              로그인
              <ArrowRight size={20} className="submit-icon" />
            </button>
          </form>

          <div className="login-footer">
            <span>아직 계정이 없으신가요?</span>
            <button 
              type="button" 
              className="text-btn primary"
              onClick={() => alert('회원가입 페이지는 준비 중입니다.')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
