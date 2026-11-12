import { Info } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="site-brand">
          顺眼顺手
        </Link>
        <span className="site-info">
          <Info aria-hidden />
        </span>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
}
