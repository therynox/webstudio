import React, { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, FileImage, FolderKanban, Loader2, RefreshCw, Wrench, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

export default function MediaHealth() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/uploads/health");
      setData(response.data?.data || null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to audit media.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <AdminLayout title="Media health">
      <div className="admin-page media-health-page">
        <section className="admin-page-heading compact">
          <div>
            <div className="admin-eyebrow"><span /> SYSTEM / MEDIA</div>
            <h1>Media health</h1>
            <p>Check every project cover and gallery reference against the files actually stored on the server.</p>
          </div>
          <button className="admin-secondary-button" onClick={load} disabled={loading}>
            <RefreshCw size={15} className={loading ? "spin" : ""} /> Scan again
          </button>
        </section>

        {error && <div className="admin-alert error">{error}</div>}

        {loading && !data ? (
          <div className="admin-table-loading"><Loader2 size={18} className="spin" /> Scanning project media...</div>
        ) : data ? (
          <>
            <section className="media-health-stats">
              <HealthStat label="Stored files" value={data.summary.files} icon={FileImage} />
              <HealthStat label="Image references" value={data.summary.references} icon={FolderKanban} />
              <HealthStat label="Healthy" value={data.summary.healthy} icon={CheckCircle2} good />
              <HealthStat label="Missing" value={data.summary.missing} icon={AlertTriangle} danger={data.summary.missing > 0} />
            </section>

            <section className={`admin-panel media-health-panel ${data.missing.length ? "has-missing" : "is-healthy"}`}>
              <div className="media-health-panel-head">
                <div>
                  <div className="admin-eyebrow"><span /> AUDIT RESULT</div>
                  <h2>{data.missing.length ? `${data.missing.length} broken image reference${data.missing.length === 1 ? "" : "s"}` : "All project media is healthy"}</h2>
                  <p>{data.missing.length ? "These database references point to files that are no longer present. Open the project, remove the broken reference and upload the correct image." : "Every local project image referenced by MongoDB exists on disk."}</p>
                </div>
              </div>

              {data.missing.length ? (
                <div className="media-missing-list">
                  {data.missing.map((item, index) => (
                    <article className="media-missing-item" key={`${item.projectId}-${item.type}-${item.index ?? "cover"}-${index}`}>
                      <div className="media-missing-icon"><AlertTriangle size={17} /></div>
                      <div className="media-missing-copy">
                        <strong>{item.projectTitle}</strong>
                        <span>{item.type === "cover" ? "Cover image" : `Gallery image ${Number(item.index) + 1}`}</span>
                        <code>{item.url}</code>
                      </div>
                      <div className="media-missing-actions">
                        <Link className="admin-secondary-button" to={`/admin/projects/${item.projectId}/edit`}>
                          <Wrench size={14} /> Repair
                        </Link>
                        <a className="admin-icon-button" href={getMediaUrl(item.url)} target="_blank" rel="noreferrer" title="Test image URL">
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="media-success-box">
                  <CheckCircle2 size={20} />
                  <div><strong>No broken project image references.</strong><span>The Work page, project details and admin previews can safely use the current media library.</span></div>
                </div>
              )}
            </section>

            <section className="admin-panel media-files-panel">
              <div className="media-health-panel-head">
                <div>
                  <div className="admin-eyebrow"><span /> FILE LIBRARY</div>
                  <h2>Stored project images</h2>
                  <p>{data.files.length} physical image file{data.files.length === 1 ? "" : "s"} currently available.</p>
                </div>
              </div>
              <div className="media-file-grid">
                {data.files.map(file => (
                  <a key={file.filename} href={getMediaUrl(file.url)} target="_blank" rel="noreferrer" className="media-file-card">
                    <div className="media-file-preview"><img src={getMediaUrl(file.url)} alt="" /></div>
                    <div><strong>{file.filename}</strong><span>{formatBytes(file.size)}</span></div>
                  </a>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}

function HealthStat({ label, value, icon: Icon, good, danger }) {
  return <div className={`media-health-stat ${good ? "good" : ""} ${danger ? "danger" : ""}`}><Icon size={17} /><div><strong>{value}</strong><span>{label}</span></div></div>;
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}
