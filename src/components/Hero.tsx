import { useState, useEffect } from 'react';
import './Hero.scss';
import { IconSearch } from './icons'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const recentTags = ['1234-5678-9012', '9876-5432-1011']
const images = ['/terminal.png', '/van.png', '/factory.png'];
// 무한 루프 스크롤을 위해 앞뒤로 복제본을 하나씩 둡니다.
const extendedImages = [images[images.length - 1], ...images, images[0]];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Drag states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto Slide
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToPrev = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    if (currentIndex >= extendedImages.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // 버튼이나 입력창 등을 클릭했을 때는 드래그가 작동하지 않도록 예외 처리
    if ((e.target as HTMLElement).closest('button, input, a, .hero-controls, .recent')) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setIsPlaying(false);
    setTouchStartX(clientX);
    setDragOffset(0);
    setIsDragging(true);
    setIsTransitioning(false);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || touchStartX === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragOffset(clientX - touchStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    if (dragOffset > 50) {
      goToPrev();
    } else if (dragOffset < -50) {
      goToNext();
    } else {
      setIsTransitioning(true); // Snap back
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setTouchStartX(null);
  };

  // 트랜지션이 끝났을 때 눈속임으로 진짜 인덱스로 스위칭합니다.
  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(images.length);
    } else if (currentIndex === extendedImages.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  return (
    <section 
      className="hero"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Slider Backgrounds */}
      <div 
        className="hero-slider" 
        style={{ 
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isTransitioning && !isDragging ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((img, idx) => (
          <div 
            key={idx} 
            className="hero-slide-bg"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* Dark Overlay for readability */}
      <div className="hero-overlay" />

      <div className="container">
        <span className="badge badge-blue">
          <span className="dot" />남양주 터미널 실시간 운영 중
        </span>
        <p className="hero-sub">
          고객의 문 앞까지 안전하게, 라스트마일의 시작.
          <br />
          NexusHub 남양주터미널이 함께합니다.
        </p>
        <h1>
          우리 동네를 가장
          <br />
          잘 아는 배송 파트너
          <span className="brand-name">Nexus<span className="hub">Hub</span></span>
        </h1>
        <div className="search-bar">
          <span className="ico">
            <IconSearch />
          </span>
          <input type="text" placeholder="운송장 번호를 입력하세요 (- 제외)" />
          <button>실시간 배송 조회</button>
        </div>
        <div className="recent">
          <span className="label">최근 검색 :</span>
          {recentTags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="hero-controls">
        <button className="control-btn" onClick={goToPrev} aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <button className="control-btn play-btn" onClick={togglePlay} aria-label="Play/Pause">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button className="control-btn" onClick={goToNext} aria-label="Next image">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}
