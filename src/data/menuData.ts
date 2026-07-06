export const menus = [
  {
    title: '허브소개',
    path: '/about/message',
    sub: [
      { label: '센터장 인사말', path: '/about/message' },
      { label: '인프라 및 시스템', path: '/about/infrastructure' },
      { label: '오시는 길', path: '/about/location' },
      { label: '회사연혁', path: '/about/history' }
    ]
  },
  {
    title: '배송조회',
    path: '/tracking/waybill',
    sub: [
      { label: '일반운송장조회', path: '/tracking/waybill' },
      { label: '우리동네택배현황', path: '/tracking/neighborhood' },
      { label: '지역집화(수거)현황', path: '/tracking/pickup' }
    ]
  },
  {
    title: '물류상담',
    path: '/consulting/info',
    sub: [
      { label: '상담안내', path: '/consulting/info' },
      { label: '상담신청', path: '/consulting/apply' }
    ]
  },
  {
    title: '고객센터',
    path: '/support/notice',
    sub: [
      { label: '공지사항', path: '/support/notice' },
      { label: '자주묻는질문', path: '/support/faq' },
      { label: '파손/분실접수', path: '/support/claim' },
      { label: '1:1 문의', path: '/support/inquiry' }
    ]
  }
];
