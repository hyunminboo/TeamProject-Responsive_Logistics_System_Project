import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

type SidebarItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

type SidebarProps = {
  data: {
    title: string;
    items: SidebarItem[];
  }
};

export default function Sidebar({ data }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = data.items.find(item => item.path === location.pathname) || data.items[0];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{data.title}</h2>
      </div>

      <div className="mobile-dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{activeItem.label}</span>
        <ChevronDown size={18} className={`arrow ${isOpen ? 'open' : ''}`} />
      </div>

      <ul className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
        {data.items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="icon"><Icon size={20} /></span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
