import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  FolderKanban,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  Search,
  UserRoundPlus,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", path: "/admin/projects", icon: FolderKanban },
  { label: "Blog", path: "/admin/blog", icon: FileText },
  { label: "Media", path: "/admin/media", icon: Images },
  { label: "Leads", path: "/admin/leads", icon: UserRoundPlus },
  { label: "Homepage", path: "/admin/homepage", icon: LayoutDashboard },
  { label: "SEO", path: "/admin/seo", icon: Search },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children, title = "Overview", eyebrow = "Workspace" }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("therynox_admin") || "null");

  useEffect(() => setMobileOpen(false), [title]);

  const logout = () => {
    localStorage.removeItem("therynox_admin_token");
    localStorage.removeItem("therynox_admin");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <div className="admin-noise" />

      {mobileOpen && (
        <button className="admin-overlay" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`admin-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark"><span /></div>
          <div>
            <strong>THERYNOX</strong>
            <small>WEB STUDIO / CMS</small>
          </div>
          <button className="admin-icon-button mobile-only" onClick={() => setMobileOpen(false)} aria-label="Close sidebar"><X size={17} /></button>
        </div>

        <div className="admin-sidebar-content">
          <div className="admin-nav-label">{eyebrow}</div>
          <nav className="admin-nav">
            {navigation.map(({ label, path, icon: Icon }) => (
              <NavLink key={path} to={path} className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}>
                <span className="admin-nav-icon"><Icon size={17} /></span>
                <span>{label}</span>
                <ChevronRight className="admin-nav-arrow" size={14} />
              </NavLink>
            ))}
          </nav>

          <div className="admin-nav-label admin-nav-label-spaced">Actions</div>
          <NavLink to="/admin/projects/create" className="admin-create-link">
            <span><Plus size={17} /> New project</span>
            <ArrowUpRight size={14} />
          </NavLink>
          <NavLink to="/admin/blog/create" className="admin-create-link admin-create-link-secondary">
            <span><FileText size={16} /> New article</span>
            <ArrowUpRight size={14} />
          </NavLink>
        </div>

        <div className="admin-sidebar-bottom">
          <a href="/" target="_blank" rel="noreferrer" className="admin-utility-link"><ExternalLink size={15} /> View website</a>
          <button className="admin-utility-link danger" onClick={logout}><LogOut size={15} /> Sign out</button>
          <div className="admin-user-card">
            <div className="admin-avatar">{(admin?.name || admin?.email || "A").slice(0, 1).toUpperCase()}</div>
            <div className="admin-user-copy">
              <strong>{admin?.name || "Administrator"}</strong>
              <span>{admin?.email || "Authenticated session"}</span>
            </div>
            <Activity size={14} className="admin-live-dot" />
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-button mobile-only" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></button>
          <div className="admin-breadcrumb"><span>THERYNOX CMS</span><ChevronRight size={13} /><strong>{title}</strong></div>
          <div className="admin-topbar-actions">
            <a href="/" target="_blank" rel="noreferrer" className="admin-topbar-link"><ExternalLink size={14} /> <span>Website</span></a>
            <NavLink to={title.toLowerCase().includes("blog") || title.toLowerCase().includes("article") ? "/admin/blog/create" : "/admin/projects/create"} className="admin-topbar-button"><Plus size={15} /> {title.toLowerCase().includes("blog") || title.toLowerCase().includes("article") ? "New article" : "New project"}</NavLink>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
