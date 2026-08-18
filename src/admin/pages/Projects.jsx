import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Eye, FileEdit, Filter, FolderKanban, Loader2, Plus, Search, Star, Trash2, X } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = async () => {
    try { setLoading(true); setError(""); const r = await api.get("/projects/admin/all"); setProjects(r.data?.data || []); }
    catch (err) { setError(err.response?.data?.message || "Unable to load projects."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const categories = useMemo(() => ["ALL", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean))).sort()], [projects]);
  const filtered = useMemo(() => projects.filter(p => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || [p.title, p.client, p.category, p.type].some(v => String(v || "").toLowerCase().includes(q));
    return matchesSearch && (status === "ALL" || p.status === status) && (category === "ALL" || p.category === category);
  }), [projects, search, status, category]);

  const confirmDelete = async () => {
    if (!deleting) return;
    try { setDeleteBusy(true); await api.delete(`/projects/admin/${deleting._id}`); setProjects(items => items.filter(p => p._id !== deleting._id)); setDeleting(null); }
    catch (err) { setError(err.response?.data?.message || "Unable to delete project."); }
    finally { setDeleteBusy(false); }
  };

  return <AdminLayout title="Projects">
    <div className="admin-page">
      <section className="admin-page-heading compact"><div><div className="admin-eyebrow"><span /> PORTFOLIO</div><h1>Projects</h1><p>Build, edit and publish the work shown on your website.</p></div><Link to="/admin/projects/create" className="admin-primary-button"><Plus size={16} /> New project</Link></section>

      {error && <div className="admin-alert error">{error}<button onClick={load}>Retry</button></div>}

      <section className="admin-panel admin-table-panel">
        <div className="admin-toolbar">
          <div className="admin-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects, clients, categories..." />{search && <button onClick={() => setSearch("")}><X size={14} /></button>}</div>
          <div className="admin-filters"><div className="admin-filter"><Filter size={14} /><select value={status} onChange={e => setStatus(e.target.value)}><option value="ALL">All status</option><option value="published">Published</option><option value="in-progress">In Process</option><option value="draft">Draft</option></select></div><div className="admin-filter"><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c} value={c}>{c === "ALL" ? "All categories" : c}</option>)}</select></div></div>
        </div>
        <div className="admin-table-meta"><span>{filtered.length} project{filtered.length === 1 ? "" : "s"}</span><span>{status !== "ALL" || category !== "ALL" || search ? "Filtered view" : "All portfolio content"}</span></div>
        {loading ? <div className="admin-table-loading"><Loader2 className="spin" size={18} /> Loading projects...</div> : filtered.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Project</th><th>Category</th><th>Status</th><th>Featured</th><th>Updated</th><th /></tr></thead><tbody>{filtered.map(project => <ProjectRow key={project._id} project={project} onDelete={() => setDeleting(project)} />)}</tbody></table></div> : <div className="admin-empty table-empty"><FolderKanban size={28} /><strong>No matching projects</strong><span>Try changing your filters or create a new project.</span></div>}
      </section>
    </div>

    {deleting && <div className="admin-modal-backdrop"><div className="admin-modal"><div className="admin-modal-icon"><Trash2 size={18} /></div><h2>Delete project?</h2><p>This will permanently remove <strong>{deleting.title}</strong> from the CMS.</p><div className="admin-modal-actions"><button className="admin-secondary-button" onClick={() => setDeleting(null)} disabled={deleteBusy}>Cancel</button><button className="admin-danger-button" onClick={confirmDelete} disabled={deleteBusy}>{deleteBusy ? <Loader2 size={15} className="spin" /> : <Trash2 size={15} />} Delete</button></div></div></div>}
  </AdminLayout>;
}

function ProjectRow({ project, onDelete }) {
  return <tr><td><div className="admin-table-project"><div className="admin-table-thumb">{project.coverImage ? <img src={getMediaUrl(project.coverImage)} alt={project.title || "Project"} /> : <FolderKanban size={16} />}</div><div><strong>{project.title || "Untitled"}</strong><span>{project.client || "No client"}</span></div></div></td><td><span className="admin-category">{project.category || "—"}</span></td><td><span className={`admin-status ${project.status}`}>{project.status}</span></td><td>{project.featured ? <span className="admin-featured"><Star size={13} fill="currentColor" /> Featured</span> : <span className="admin-muted">—</span>}</td><td><span className="admin-muted">{project.updatedAt ? new Date(project.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</span></td><td><div className="admin-row-actions"><Link title="Edit" to={`/admin/projects/${project._id}/edit`}><FileEdit size={14} /></Link>{project.liveUrl && <a title="Open live project" href={project.liveUrl} target="_blank" rel="noreferrer"><Eye size={14} /></a>}<button title="Delete" onClick={onDelete}><Trash2 size={14} /></button></div></td></tr>;
}
