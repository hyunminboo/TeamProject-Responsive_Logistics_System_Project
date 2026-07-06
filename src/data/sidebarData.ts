import React from "react";
import {
  IconSpeaker,
  IconDocument,
  IconChat,
  IconUser,
  IconBox,
  IconMap,
  IconClock,
  IconSearch,
  IconTruck,
  IconHome,
  IconConsultChat,
  IconHelpCircle,
  IconFilePlus
} from "../components/icons";

// 사이드바 전용 데이터 매핑
// 각 top-level route (예: about, tracking, consulting, support) 별로 사이드바 구성을 정의합니다.
export const sidebarData: Record<
  string,
  {
    title: string;
    items: {
      label: string;
      path: string;
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
    }[];
  }
> = {
  about: {
    title: "허브소개",
    items: [
      { label: "센터장 인사말", path: "/about/message", icon: IconUser },
      {
        label: "인프라 및 시스템",
        path: "/about/infrastructure",
        icon: IconBox,
      },
      { label: "오시는 길", path: "/about/location", icon: IconMap },
      { label: "회사연혁", path: "/about/history", icon: IconClock },
    ],
  },
  tracking: {
    title: "배송조회",
    items: [
      { label: "일반운송장조회", path: "/tracking/waybill", icon: IconSearch },
      {
        label: "우리동네택배현황",
        path: "/tracking/neighborhood",
        icon: IconHome,
      },
      {
        label: "지역집화(수거)현황",
        path: "/tracking/pickup",
        icon: IconTruck,
      },
    ],
  },
  consulting: {
    title: "물류상담",
    items: [
      { label: "상담안내", path: "/consulting/info", icon: IconConsultChat },
      { label: "상담신청", path: "/consulting/apply", icon: IconFilePlus },
      // 사이드바에만 추가로 들어가는 고객센터 하위 메뉴
      { label: "자주묻는질문", path: "/support/faq", icon: IconHelpCircle },
    ],
  },
  support: {
    title: "고객센터",
    items: [
      { label: "공지사항", path: "/support/notice", icon: IconSpeaker },
      { label: "자주묻는질문", path: "/support/faq", icon: IconHelpCircle },
      { label: "파손/분실 접수", path: "/support/claim", icon: IconDocument },
      { label: "1:1 문의", path: "/support/inquiry", icon: IconChat }, // 이미지에 나와있는 추가 메뉴
    ],
  },
};
