import React, { useEffect, useMemo, useState } from "react";
import { FileText, Plus, Search, Star, Trash2, Eye, Edit3, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [meta, setMeta] = useState({ total: 0, published: 0, scheduled: 0, draft: 0 });

  const load = async () => {
    try {
      setLoading(true);
      const [response, metaResponse] = await Promise.all([api.get("/blogs/admin/all?limit=100"), api.get("/blogs/admin/meta")]);
      setBlogs(response.data?.data || []);
      setMeta(metaResponse.data?.data?.counts || { total: 0, published: 0, scheduled: 0, draft: 0 });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const categories = useMemo(() => ["ALL", ...new Set(blogs.map((blog) => blog.category).filter(Boolean))], [blogs]);

  const filtered = blogs.filter((blog) => {
    const term = search.toLowerCase().trim();
    const matchesSearch = !term || `${blog.title} ${blog.category} ${blog.author}`.toLowerCase().includes(term);
    const matchesStatus = status === "ALL" || blog.status === status;
    const matchesCategory = category === "ALL" || blog.category === category;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const remove = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    try {
      setDeleting(blog._id);
      await api.delete(`/blogs/admin/${blog._id}`);
      setBlogs((items) => items.filter((item) => item._id !== blog._id));
    } catch (error) {
      window.alert(error.response?.data?.message || "Unable to delete article.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout title="Blog">
      <div className="admin-page">
        <section className="admin-page-heading">
          <div>
            <div className="admin-eyebrow"><span /> CONTENT / JOURNAL</div>
            <h1>Blog</h1>
            <p>Publish insights, case studies and useful ideas directly to your website.</p>
          </div>
          <Link to="/admin/blog/create" className="admin-primary-button"><Plus size={16} /> New article</Link>
        </section>

        <section className="admin-stat-grid blog-stat-grid">
          <div className="admin-stat-card"><div className="admin-stat-top"><span className="admin-stat-icon"><FileText size={15} /></span></div><div className="admin-stat-value">{meta.total}</div><strong>Total articles</strong><small>Content library</small></div>
          <div className="admin-stat-card"><div className="admin-stat-top"><span className="admin-stat-icon"><Eye size={15} /></span></div><div className="admin-stat-value">{meta.published}</div><strong>Published</strong><small>Live on /blog</small></div>
          <div className="admin-stat-card"><div className="admin-stat-top"><span className="admin-stat-icon"><Star size={15} /></span></div><div className="admin-stat-value">{meta.scheduled}</div><strong>Scheduled</strong><small>Waiting to publish</small></div>
          <div className="admin-stat-card"><div className="admin-stat-top"><span className="admin-stat-icon"><Loader2 size={15} /></span></div><div className="admin-stat-value">{meta.draft}</div><strong>Drafts</strong><small>Private articles</small></div>
        </section>

        <section className="admin-panel">
          <div className="admin-toolbar">
            <label className="admin-search">
              <Search size={15} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles, authors..." />
            </label>
            <div className="admin-filters">
              <label className="admin-filter">
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ALL">All status</option><option value="published">Published</option><option value="scheduled">Scheduled</option><option value="draft">Draft</option>
                </select>
              </label>
              <label className="admin-filter">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((item) => <option key={item} value={item}>{item === "ALL" ? "All categories" : item}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="admin-table-meta"><span>{filtered.length} article{filtered.length === 1 ? "" : "s"}</span><span>Content library</span></div>

          {loading ? (
            <div className="admin-table-loading"><Loader2 size={15} className="spin" /> Loading articles...</div>
          ) : filtered.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Article</th><th>Category</th><th>Status</th><th>Views</th><th>Updated</th><th /></tr></thead>
                <tbody>
                  {filtered.map((blog) => (
                    <tr key={blog._id}>
                      <td>
                        <div className="admin-table-project">
                          <div className="admin-table-thumb">
                            {blog.coverImage ? <img src={getMediaUrl(blog.coverImage)} alt="" /> : <FileText size={16} />}
                          </div>
                          <div><strong>{blog.title}</strong><span>{blog.author || "THERYNOX Web Studio"}</span></div>
                        </div>
                      </td>
                      <td><span className="admin-category">{blog.category || "Insights"}</span></td>
                      <td><span className={`admin-status ${blog.status}`}>{blog.status}</span></td>
                      <td><span className="admin-muted">{blog.views || 0}</span></td>
                      <td><span className="admin-muted">{blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</span></td>
                      <td>
                        <div className="admin-row-actions">
                          <Link title="Edit" to={`/admin/blog/${blog._id}/edit`}><Edit3 size={14} /></Link>
                          {blog.status === "published" && <a title="Open article" href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer"><Eye size={14} /></a>}
                          {blog.featured && <span title="Featured" className="admin-featured"><Star size={13} fill="currentColor" /></span>}
                          <button title="Delete" onClick={() => remove(blog)} disabled={deleting === blog._id}>{deleting === blog._id ? <Loader2 size={14} className="spin" /> : <Trash2 size={14} />}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-empty table-empty"><FileText size={28} /><strong>No articles found</strong><span>Create your first article or change the filters.</span><Link to="/admin/blog/create" className="admin-secondary-button"><Plus size={14} /> Create article</Link></div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
