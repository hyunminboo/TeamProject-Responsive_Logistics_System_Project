import React from 'react';
import SubHero from './SubHero';
import Sidebar from './Sidebar';
import './SubPage.scss';

type SubPageLayoutProps = {
  heroTitle: string;
  heroDesc?: string;
  breadcrumbs: { label: string, path?: string }[];
  sidebarData: {
    title: string;
    items: { label: string; path: string; icon: React.ElementType }[];
  };
  sidebarExtra?: React.ReactNode;
  children: React.ReactNode;
};

export default function SubPageLayout({ heroTitle, heroDesc, breadcrumbs, sidebarData, sidebarExtra, children }: SubPageLayoutProps) {
  return (
    <div className="subpage-wrapper">
      <SubHero title={heroTitle} desc={heroDesc} breadcrumbs={breadcrumbs} />
      <div className="container subpage-container">
        <div className="sidebar-col">
          <Sidebar data={sidebarData} />
          {sidebarExtra && <div className="sidebar-extra">{sidebarExtra}</div>}
        </div>
        <div className="subpage-content">
          {children}
        </div>
      </div>
    </div>
  );
}
