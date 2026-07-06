export interface InquiryHistoryItem {
  id: string;
  status: '답변완료' | '처리중';
  title: string;
  date: string;
  question: string;
  answer?: string;
  answerDate?: string;
}

export interface UserData {
  password: string;
  inquiries: InquiryHistoryItem[];
}

export const userData: Record<string, UserData> = {
  user1: {
    password: '1234',
    inquiries: [
      {
        id: 'INQ-2025-1283',
        status: '답변완료',
        title: '배송 완료 후 물건 미수령 관련 문의드립니다',
        date: '2025.12.08',
        question: '택배사 홈페이지에서는 어제 날짜로 배송 완료라고 뜨는데, 실제로는 물건을 받지 못했습니다.\n문 앞이나 경비실에도 없네요. 확인 부탁드립니다.',
        answer: '안녕하세요, 넥서스허브 고객센터입니다.\n\n고객님께서 문의하신 상품의 배송 상황을 택배사 쪽에 확인해 본 결과, 담당 기사님의 착오로 오배송이 된 것으로 확인되었습니다.\n현재 즉시 회수 후 고객님 댁으로 정상 재배송될 수 있도록 조치하였습니다.\n\n불편을 드려 대단히 죄송하며, 추가 문의사항이 있으시면 언제든 연락 부탁드립니다. 감사합니다.',
        answerDate: '2025.12.09'
      },
      {
        id: 'INQ-2025-1271',
        status: '처리중',
        title: '반품 신청 후 수거 기사님 미방문 건',
        date: '2025.12.05',
        question: '3일 전에 반품 신청을 했는데 아직 수거 기사님이 오지 않으셨습니다.\n언제쯤 방문 예정이신지 알 수 있을까요?'
      }
    ]
  },
  user2: {
    password: '1234',
    inquiries: [
      {
        id: 'INQ-2025-1299',
        status: '처리중',
        title: '배송 주소 변경 요청',
        date: '2025.12.10',
        question: '어제 주문했는데 배송지를 잘못 입력했습니다. 배송 전이라면 주소 변경이 가능할까요?'
      }
    ]
  }
};
