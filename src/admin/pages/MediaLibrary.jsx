import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  FileImage,
  FolderOpen,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

const categories = [
  ["all", "All media"],
  ["projects", "Projects"],
  ["blog", "Blog"],
  ["homepage", "Homepage"],
  ["other", "Other"],
];

function formatBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
}

export default function MediaLibrary() {
  const inputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [replacing, setReplacing] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/media", {
        params: { category, search: search.trim() },
      });
      setItems(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to load media.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(load, 220);
    return () => clearTimeout(timer);
  }, [category, search]);

  const stats = useMemo(() => ({
    total: items.length,
    used: items.filter((item) => item.usage?.length).length,
    unused: items.filter((item) => !item.usage?.length).length,
  }), [items]);

  const uploadFiles = async (files) => {
    if (!files?.length) return;
    setError("");
    setSuccess("");
    setUploading(true);
    setUploadProgress(0);

    // All Media is only a filter. New uploads need a real storage category.
    // Default to Projects because the upload button is primarily used from
    // the project/media workflow, while Blog/Homepage/Other can be selected.
    const uploadCategory = category === "all" ? "projects" : category;

    const form = new FormData();
    form.append("category", uploadCategory);
    Array.from(files).forEach((file) => form.append("files", file));

    try {
      await api.post("/media", form, {
        onUploadProgress: (event) => {
          if (event.total) setUploadProgress(Math.round((event.loaded / event.total) * 100));
        },
      });
      setSuccess(`${files.length} image${files.length === 1 ? "" : "s"} uploaded successfully.`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Image upload failed.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const copyUrl = async (item) => {
    try {
      await navigator.clipboard.writeText(getMediaUrl(item.url));
      setSuccess("Image URL copied to clipboard.");
    } catch {
      setError("Unable to copy the image URL.");
    }
  };

  const replaceItem = async (item, file) => {
    if (!file) return;

    setReplacing(true);
    setError("");
    setSuccess("");

    const form = new FormData();
    form.append("file", file);

    try {
      const response = await api.put(
        `/media/${item.category}__${encodeURIComponent(item.filename)}`,
        form
      );

      const replacement = response.data?.data?.replacement;

      setSuccess(
        response.data?.message ||
          "Image replaced successfully. All existing references were updated."
      );

      if (replacement) {
        setSelected({
          ...item,
          id: replacement.id,
          filename: replacement.filename,
          url: replacement.url,
          size: replacement.size,
          type: replacement.type,
          modifiedAt: replacement.modifiedAt,
          usage: replacement.usage || [],
        });
      }

      await load();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to replace image.");
    } finally {
      setReplacing(false);
      if (replaceInputRef.current) replaceInputRef.current.value = "";
    }
  };

  const deleteItem = async (item) => {
    if (item.usage?.length) {
      setError("This image is currently in use and cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete ${item.filename}? This cannot be undone.`)) return;

    try {
      await api.delete(`/media/${item.category}__${encodeURIComponent(item.filename)}`);
      setSuccess("Image deleted successfully.");
      if (selected?.id === item.id) setSelected(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete image.");
    }
  };

  return (
    <AdminLayout title="Media" eyebrow="Library">
      <div className="admin-page media-library-page">
        <section className="admin-page-heading compact media-library-heading">
          <div>
            <div className="admin-eyebrow"><span /> ASSET MANAGEMENT</div>
            <h1>Media Library</h1>
            <p>Upload, search, preview and safely manage every image used by your website.</p>
          </div>
          <div className="media-heading-actions">
            <button className="admin-secondary-button" onClick={load} disabled={loading} type="button">
              <RefreshCw size={15} className={loading ? "spin" : ""} /> Refresh
            </button>
            <button className="admin-primary-button" onClick={() => inputRef.current?.click()} disabled={uploading} type="button">
              <UploadCloud size={15} /> {uploading ? "Uploading..." : "Upload images"}
            </button>
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" multiple hidden onChange={(e) => uploadFiles(e.target.files)} />
            <input
              ref={replaceInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (selected && file) replaceItem(selected, file);
              }}
            />
          </div>
        </section>

        {error && <div className="admin-alert error"><AlertTriangle size={15} /> {error}<button onClick={() => setError("")}><X size={14} /></button></div>}
        {success && <div className="admin-alert success"><CheckCircle2 size={15} /> {success}<button onClick={() => setSuccess("")}><X size={14} /></button></div>}

        {uploading && (
          <div className="media-upload-progress">
            <div className="media-upload-progress-top"><span>Uploading image{uploadProgress === 100 ? "s" : ""}...</span><strong>{uploadProgress}%</strong></div>
            <div className="media-progress-track"><span style={{ width: `${uploadProgress}%` }} /></div>
            <small>Upload happens without reloading the page.</small>
          </div>
        )}

        <section
          className={`media-dropzone ${dragging ? "dragging" : ""}`}
          onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => { if (e.currentTarget === e.target) setDragging(false); }}
          onDrop={(e) => { e.preventDefault(); setDragging(false); uploadFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
        >
          <div className="media-drop-icon"><UploadCloud size={22} /></div>
          <div><strong>Drop images here</strong><span>or click to browse · JPG, PNG, WEBP, GIF, SVG · up to 10 MB each</span></div>
        </section>

        <section className="media-toolbar">
          <div className="media-category-tabs">
            {categories.map(([value, label]) => (
              <button key={value} type="button" className={category === value ? "active" : ""} onClick={() => setCategory(value)}>
                {label}
              </button>
            ))}
          </div>
          <label className="media-search"><Search size={15} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search filenames..." /></label>
        </section>

        <section className="media-summary-row">
          <div><FileImage size={16} /><strong>{stats.total}</strong><span>visible files</span></div>
          <div><CheckCircle2 size={16} /><strong>{stats.used}</strong><span>in use</span></div>
          <div><FolderOpen size={16} /><strong>{stats.unused}</strong><span>unused</span></div>
        </section>

        {loading ? (
          <div className="admin-table-loading"><Loader2 size={18} className="spin" /> Loading media library...</div>
        ) : items.length ? (
          <section className="media-library-grid">
            {items.map((item) => (
              <article className="media-card" key={item.id}>
                <button className="media-card-preview" type="button" onClick={() => setSelected(item)}>
                  <img src={getMediaUrl(item.url)} alt={item.filename} loading="lazy" />
                  {item.usage?.length ? <span className="media-used-badge">IN USE</span> : <span className="media-unused-badge">UNUSED</span>}
                </button>
                <div className="media-card-body">
                  <div className="media-card-title" title={item.filename}>{item.filename}</div>
                  <div className="media-card-meta"><span>{item.category}</span><span>{item.type}</span><span>{formatBytes(item.size)}</span></div>
                  <div className="media-card-actions">
                    <button type="button" onClick={() => setSelected(item)}>Details</button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(item);
                        replaceInputRef.current?.click();
                      }}
                    >
                      Replace
                    </button>
                    <button type="button" onClick={() => copyUrl(item)}><Copy size={13} /> Copy URL</button>
                    <button type="button" className={item.usage?.length ? "disabled" : "danger"} disabled={Boolean(item.usage?.length)} title={item.usage?.length ? "Image is in use" : "Delete image"} onClick={() => deleteItem(item)}><Trash2 size={13} /></button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="media-empty"><FileImage size={28} /><strong>No images found</strong><span>Upload your first image or change the current filter.</span></div>
        )}

        {selected && (
          <div className="media-modal-backdrop" onClick={() => setSelected(null)}>
            <aside className="media-modal" onClick={(e) => e.stopPropagation()}>
              <button className="media-modal-close" type="button" onClick={() => setSelected(null)}><X size={17} /></button>
              <div className="media-modal-image"><img src={getMediaUrl(selected.url)} alt={selected.filename} /></div>
              <div className="media-modal-copy">
                <div className="admin-eyebrow"><span /> MEDIA DETAILS</div>
                <h2>{selected.filename}</h2>
                <div className="media-detail-grid">
                  <div><span>Category</span><strong>{selected.category}</strong></div>
                  <div><span>Type</span><strong>{selected.type}</strong></div>
                  <div><span>Size</span><strong>{formatBytes(selected.size)}</strong></div>
                  <div><span>Status</span><strong>{selected.usage?.length ? "In use" : "Unused"}</strong></div>
                </div>
                <label className="settings-field"><span>Public URL</span><input value={getMediaUrl(selected.url)} readOnly /></label>
                {selected.usage?.length ? (
                  <div className="media-usage-box"><strong>Used in</strong>{selected.usage.map((use, index) => <span key={index}>• {use.title} · {use.field}</span>)}</div>
                ) : <div className="media-unused-box">This file is not currently referenced by Projects, Blog or Homepage SEO.</div>}
                <div className="media-modal-actions">
                  <button className="admin-secondary-button" type="button" onClick={() => copyUrl(selected)}><Copy size={14} /> Copy URL</button>
                  <button className="admin-secondary-button" type="button" disabled={replacing} onClick={() => replaceInputRef.current?.click()}>
                    {replacing ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} />}
                    {replacing ? "Replacing..." : "Replace"}
                  </button>
                  <button className="admin-secondary-button danger-button" type="button" disabled={Boolean(selected.usage?.length)} onClick={() => deleteItem(selected)}><Trash2 size={14} /> Delete</button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
