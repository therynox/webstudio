import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Clock3, FileText, FolderKanban, Plus, Star, TrendingUp } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

const formatDate = (value) => value ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)) : "—";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const [projectResponse, blogResponse] = await Promise.all([
        api.get("/projects/admin/all"),
        api.get("/blogs/admin/all"),
      ]);
      setProjects(projectResponse.data?.data || []);
      setBlogs(blogResponse.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load dashboard data.");
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const stats = useMemo(() => ({
    total: projects.length,
    published: projects.filter(p => p.status === "published").length,
    drafts: projects.filter(p => p.status === "draft").length,
    featured: projects.filter(p => p.featured).length,
    blogTotal: blogs.length,
    blogPublished: blogs.filter(b => b.status === "published").length,
    blogDrafts: blogs.filter(b => b.status === "draft").length,
  }), [projects, blogs]);

  const recent = useMemo(() => [...projects].sort((a,b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)).slice(0, 6), [projects]);

  return (
    <AdminLayout title="Overview">
      <div className="admin-page">
        <section className="admin-page-heading">
          <div>
            <div className="admin-eyebrow"><span /> CONTROL CENTER</div>
            <h1>Good to see you.</h1>
            <p>Manage your portfolio, publishing state and project content from one place.</p>
          </div>
          <Link to="/admin/projects/create" className="admin-primary-button"><Plus size={16} /> Create project</Link>
        </section>

        {error && <div className="admin-alert error">{error}<button onClick={load}>Retry</button></div>}

        <section className="admin-stat-grid">
          <Stat label="Total projects" value={stats.total} icon={FolderKanban} detail="All portfolio entries" />
          <Stat label="Published" value={stats.published} icon={CheckCircle2} detail="Visible on website" />
          <Stat label="Drafts" value={stats.drafts} icon={Clock3} detail="Waiting to publish" />
          <Stat label="Featured" value={stats.featured} icon={Star} detail="Highlighted work" />
          <Stat label="Published articles" value={stats.blogPublished} icon={FileText} detail={`${stats.blogDrafts} drafts in CMS`} />
        </section>

        <section className="admin-dashboard-grid">
          <div className="admin-panel admin-recent-panel">
            <div className="admin-panel-heading"><div><span>Portfolio</span><h2>Recent projects</h2></div><Link to="/admin/projects">View all <ArrowUpRight size={14} /></Link></div>
            {loading ? <RowsSkeleton /> : recent.length ? <div className="admin-project-list">{recent.map(project => <RecentProject key={project._id} project={project} />)}</div> : <EmptyState />}
          </div>

          <div className="admin-panel admin-insight-panel">
            <div className="admin-panel-heading"><div><span>System</span><h2>Publishing health</h2></div><TrendingUp size={17} /></div>
            <HealthRow label="Published coverage" value={stats.total ? Math.round(stats.published / stats.total * 100) : 0} />
            <HealthRow label="Featured coverage" value={stats.total ? Math.round(stats.featured / stats.total * 100) : 0} />
            <div className="admin-insight-card"><strong>Keep it sharp.</strong><p>Use featured projects for your strongest case studies and keep drafts private until the content is ready.</p></div>
            <Link to="/admin/projects/create" className="admin-secondary-button"><Plus size={15} /> Add a new case study</Link>
          </div>
        </section>

        <section className="admin-panel admin-blog-dashboard-panel">
          <div className="admin-panel-heading">
            <div><span>Content</span><h2>Latest articles</h2></div>
            <Link to="/admin/blog">Manage blog <ArrowUpRight size={14} /></Link>
          </div>
          {blogs.slice(0, 4).map((blog) => (
            <Link key={blog._id} to={`/admin/blog/${blog._id}/edit`} className="admin-project-row admin-blog-row">
              <div className="admin-project-thumb">{blog.coverImage ? <img src={getMediaUrl(blog.coverImage)} alt="" /> : <FileText size={17} />}</div>
              <div className="admin-project-info"><strong>{blog.title}</strong><span>{blog.category || "Insights"}</span></div>
              <div className={`admin-status ${blog.status}`}>{blog.status}</div>
              <time>{blog.views || 0} views</time>
              <ArrowUpRight size={14} />
            </Link>
          ))}
          {!blogs.length && <div className="admin-empty"><FileText size={24} /><strong>No articles yet</strong><span>Start building your content library.</span></div>}
        </section>
      </div>
    </AdminLayout>
  );
}

function Stat({ label, value, icon: Icon, detail }) {
  return <div className="admin-stat-card"><div className="admin-stat-top"><span className="admin-stat-icon"><Icon size={17} /></span><span className="admin-stat-value">{value}</span></div><strong>{label}</strong><small>{detail}</small></div>;
}
function RecentProject({ project }) {
  return <Link to={`/admin/projects/${project._id}/edit`} className="admin-project-row"><div className="admin-project-thumb">{project.coverImage ? <img src={getMediaUrl(project.coverImage)} alt="" /> : <FolderKanban size={18} />}</div><div className="admin-project-info"><strong>{project.title || "Untitled project"}</strong><span>{project.client || project.category || "Portfolio"}</span></div><div className={`admin-status ${project.status}`}>{project.status}</div><time>{formatDate(project.updatedAt || project.createdAt)}</time><ArrowUpRight size={14} /></Link>;
}
function HealthRow({ label, value }) { return <div className="admin-health-row"><div><span>{label}</span><strong>{value}%</strong></div><div className="admin-progress"><span style={{ width: `${value}%` }} /></div></div>; }
function RowsSkeleton() { return <div className="admin-skeleton-list">{[1,2,3,4].map(i => <div key={i} className="admin-skeleton-row" />)}</div>; }
function EmptyState() { return <div className="admin-empty"><FolderKanban size={26} /><strong>No projects yet</strong><span>Create your first portfolio case study.</span></div>; }
