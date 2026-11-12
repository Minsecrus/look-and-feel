import { Link, Outlet } from "react-router";
import { ThemeSwitcher } from "~/components/ThemeSwitcher";

export default function SiteLayout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="site-brand">
          顺眼顺手
        </Link>
        <ThemeSwitcher />
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
}
