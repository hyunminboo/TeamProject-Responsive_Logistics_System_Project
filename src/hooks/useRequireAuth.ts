import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useRequireAuth() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const alerted = useRef(false);

  useEffect(() => {
    // React 18 StrictMode 렌더링 중복으로 인한 alert 2번 발생 방지
    if (!userId && !alerted.current) {
      alerted.current = true;
      // 비동기로 띄워 렌더링 블로킹 방지
      setTimeout(() => {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login', { replace: true });
      }, 0);
    }
  }, [userId, navigate]);

  return userId;
}
