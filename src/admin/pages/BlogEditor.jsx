import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarClock, Eye, ImagePlus, Loader2, Plus, Save, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

const emptyBlog = {
  title: "", slug: "", excerpt: "", content: "", coverImage: "",
  category: "Insights", tags: [], author: "THERYNOX Web Studio",
  readTime: 5, featured: false, status: "draft", publishedAt: "",
  seo: { title: "", description: "", keywords: [] },
};

const slugify = (value) => String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const toLocalDateTime = (value) => value ? new Date(value).toISOString().slice(0, 16) : "";

export default function BlogEditor({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyBlog);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState(["Insights"]);

  useEffect(() => {
    api.get("/blogs/admin/meta")
      .then((response) => setCategories(["Insights", ...(response.data?.data?.categories || []).filter((item) => item !== "Insights")]))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (mode !== "edit") return;
    api.get(`/blogs/admin/${id}`)
      .then((response) => {
        const blog = response.data.data || {};
        setForm({ ...emptyBlog, ...blog, publishedAt: toLocalDateTime(blog.publishedAt), seo: { ...emptyBlog.seo, ...(blog.seo || {}) } });
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load article."))
      .finally(() => setLoading(false));
  }, [id, mode]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const setSeo = (key, value) => setForm((current) => ({ ...current, seo: { ...current.seo, [key]: value } }));

  const wordCount = useMemo(() => String(form.content || "").trim().split(/\s+/).filter(Boolean).length, [form.content]);
  const calculatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const updateTitle = (value) => setForm((current) => ({ ...current, title: value, slug: mode === "create" && !current.slug ? slugify(value) : current.slug }));

  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, "");
    if (!tag || form.tags.includes(tag)) return;
    setForm((current) => ({ ...current, tags: [...current.tags, tag] }));
    setTagInput("");
  };

  const uploadCover = async (file) => {
    if (!file) return;
    try {
      setError("");
      setUploading(true);
      const data = new FormData();
      data.append("files", file);
      const response = await api.post("/uploads", data);
      const url = response.data?.data?.[0]?.url;
      if (!url) throw new Error("Upload completed but the server returned no image URL.");
      setField("coverImage", url);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const openPreview = () => {
    const preview = window.open("", "_blank", "noopener,noreferrer");
    if (!preview) return;
    const paragraphs = String(form.content || "").split(/\n{2,}/).filter(Boolean).map((p) => `<p>${p.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")}</p>`).join("");
    const image = form.coverImage ? `<img src="${getMediaUrl(form.coverImage)}" alt="" />` : "";
    preview.document.write(`<!doctype html><html><head><title>${form.title || "Article preview"}</title><style>body{margin:0;background:#070707;color:#eee;font:16px/1.8 Inter,Arial,sans-serif}main{max-width:820px;margin:0 auto;padding:70px 24px}img{width:100%;max-height:480px;object-fit:cover;border-radius:16px;margin:25px 0}h1{font-size:48px;line-height:1.05}p{color:#aaa}</style></head><body><main><small>${form.category}</small><h1>${form.title || "Untitled article"}</h1><p>${form.excerpt || ""}</p>${image}${paragraphs}</main></body></html>`);
    preview.document.close();
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (wordCount < 10) {
      setError("Article content is too short. Write at least 10 words.");
      return;
    }
    if (form.status === "scheduled" && !form.publishedAt) {
      setError("Choose a publish date and time for the scheduled article.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...form,
        slug: slugify(form.slug || form.title),
        readTime: calculatedReadTime,
        publishedAt: form.publishedAt || null,
      };
      const response = mode === "edit"
        ? await api.put(`/blogs/admin/${id}`, payload)
        : await api.post("/blogs/admin", payload);
      const saved = response.data?.data;
      navigate(`/admin/blog/${saved?._id || id}/edit`, { replace: true });
    } catch (err) {
      console.error("BLOG SAVE ERROR:", err);
      setError(err.response?.data?.message || err.message || "Unable to save article.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout title="Blog"><div className="admin-table-loading"><Loader2 size={16} className="spin" /> Loading article...</div></AdminLayout>;

  return (
    <AdminLayout title={mode === "edit" ? "Edit article" : "New article"}>
      <form className="admin-page blog-editor-page" onSubmit={submit}>
        <div className="editor-toolbar">
          <Link to="/admin/blog" className="editor-back"><ArrowLeft size={13} /> Back to blog</Link>
          <div className="editor-toolbar-actions">
            {error && <span className="editor-save-state" style={{ color: "#ff8b8b" }}>{error}</span>}
            <button type="button" className="editor-preview-link editor-preview-button" onClick={openPreview}><Eye size={14} /> Preview</button>
            <button className="admin-primary-button" type="submit" disabled={saving || uploading}><Save size={14} /> {saving ? "Saving..." : "Save article"}</button>
          </div>
        </div>

        <div className="editor-grid">
          <div className="editor-main">
            <section className="editor-section">
              <div className="editor-section-heading"><h2>Article content</h2><p>Write useful, practical content. Separate paragraphs with an empty line.</p></div>
              <label className="editor-field"><span>Title <em>*</em></span><input id="blog-title" name="title" value={form.title} onChange={(e) => updateTitle(e.target.value)} placeholder="e.g. 7 ways to improve an e-commerce website" required /></label>
              <label className="editor-field"><span>Slug <em>*</em></span><input id="blog-slug" name="slug" value={form.slug} onChange={(e) => setField("slug", slugify(e.target.value))} placeholder="your-article-slug" required /></label>
              <label className="editor-field"><span>Excerpt</span><textarea id="blog-excerpt" name="excerpt" rows="3" maxLength="220" value={form.excerpt} onChange={(e) => setField("excerpt", e.target.value)} placeholder="A concise summary for the blog card and search results." /><small className="editor-counter">{form.excerpt.length}/220</small></label>
              <label className="editor-field"><span>Content <em>*</em></span><textarea id="blog-content" name="content" className="blog-content-input" rows="20" value={form.content} onChange={(e) => setField("content", e.target.value)} placeholder={"Start writing...\n\nUse blank lines between paragraphs."} required /></label>
              <div className="editor-content-meta"><span>{wordCount.toLocaleString()} words</span><span>~{calculatedReadTime} min read</span></div>
            </section>

            <section className="editor-section">
              <div className="editor-section-heading"><h2>Search engine settings</h2><p>Control the title and description used when this article appears in search.</p></div>
              <label className="editor-field"><span>SEO title</span><input id="seo-title" name="seoTitle" value={form.seo.title} onChange={(e) => setSeo("title", e.target.value)} placeholder={form.title || "SEO title"} /></label>
              <label className="editor-field"><span>SEO description</span><textarea id="seo-description" name="seoDescription" rows="3" value={form.seo.description} onChange={(e) => setSeo("description", e.target.value)} placeholder={form.excerpt || "SEO description"} /></label>
              <label className="editor-field"><span>Keywords</span><input id="seo-keywords" name="seoKeywords" value={(form.seo.keywords || []).join(", ")} onChange={(e) => setSeo("keywords", e.target.value.split(",").map(v => v.trim()).filter(Boolean))} placeholder="web design, ecommerce, seo" /></label>
            </section>
          </div>

          <aside className="editor-side">
            <section className="editor-section">
              <div className="editor-section-heading"><h2>Publishing</h2><p>Save drafts, publish now, or schedule the article.</p></div>
              <label className="editor-field"><span>Status</span><select id="blog-status" name="status" value={form.status} onChange={(e) => setField("status", e.target.value)}><option value="draft">Draft</option><option value="published">Published now</option><option value="scheduled">Scheduled</option></select></label>
              {form.status === "scheduled" && <label className="editor-field"><span>Publish date & time</span><input id="published-at" name="publishedAt" type="datetime-local" value={form.publishedAt || ""} onChange={(e) => setField("publishedAt", e.target.value)} /><small className="editor-helper"><CalendarClock size={12} /> Must be a future date.</small></label>}
              <label className="toggle-card"><div><strong>Featured article</strong><span>Show this article as the main story.</span></div><input id="featured" name="featured" type="checkbox" checked={form.featured} onChange={(e) => setField("featured", e.target.checked)} /><span className="toggle-ui" /></label>
            </section>

            <section className="editor-section">
              <div className="editor-section-heading"><h2>Cover image</h2><p>Recommended: 1600 × 1000px.</p></div>
              <label className="blog-cover-upload" htmlFor="blog-cover-upload">
                {form.coverImage ? <img src={getMediaUrl(form.coverImage)} alt="Article cover preview" /> : <><ImagePlus size={20} /><span>{uploading ? "Uploading..." : "Upload cover image"}</span><small>JPG · PNG · WEBP · GIF · SVG</small></>}
                <input id="blog-cover-upload" name="coverImageFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" onChange={(e) => { uploadCover(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
              {form.coverImage && <button type="button" className="blog-remove-cover" onClick={() => setField("coverImage", "")}><X size={13} /> Remove</button>}
            </section>

            <section className="editor-section">
              <div className="editor-section-heading"><h2>Article details</h2></div>
              <label className="editor-field"><span>Category</span><input id="blog-category" name="category" list="blog-categories" value={form.category} onChange={(e) => setField("category", e.target.value)} placeholder="Insights" /><datalist id="blog-categories">{categories.map((item) => <option key={item} value={item} />)}</datalist></label>
              <div className="editor-fields two">
                <label className="editor-field"><span>Author</span><input id="blog-author" name="author" value={form.author} onChange={(e) => setField("author", e.target.value)} /></label>
                <label className="editor-field"><span>Read time</span><input id="blog-read-time" name="readTime" type="number" min="1" value={calculatedReadTime} readOnly /></label>
              </div>
              <div className="tag-picker">{(form.tags || []).map(tag => <button type="button" className="tag-chip" key={tag} onClick={() => setField("tags", form.tags.filter(item => item !== tag))}>#{tag}<X size={11} /></button>)}</div>
              <div className="tag-add"><input id="blog-tag-input" name="tagInput" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add a tag" /><button type="button" onClick={addTag} aria-label="Add tag"><Plus size={14} /></button></div>
            </section>
          </aside>
        </div>
      </form>
    </AdminLayout>
  );
}
