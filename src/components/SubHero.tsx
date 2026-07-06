import { Link } from 'react-router-dom';

type SubHeroProps = {
  title: string;
  desc?: string;
  breadcrumbs: { label: string, path?: string }[];
};

export default function SubHero({ title, desc, breadcrumbs }: SubHeroProps) {
  return (
    <div className="sub-hero">
      <div className="container">
        <div className="sub-hero-content">
          <div className="breadcrumbs">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.path ? <Link to={crumb.path}>{crumb.label}</Link> : crumb.label}
                {index < breadcrumbs.length - 1 && <span className="separator">&gt;</span>}
              </span>
            ))}
          </div>
          <h1 className="title">{title}</h1>
          {desc && <p className="sub-hero-desc">{desc}</p>}
        </div>
      </div>
    </div>
  );
}