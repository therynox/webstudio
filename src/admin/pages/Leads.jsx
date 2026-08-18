import React, { useEffect, useMemo, useState } from "react";
import { Building2, CheckCircle2, Clock3, FileText, Filter, Mail, MessageSquare, Phone, Search, Trash2, Trophy, UserRound, X, CalendarClock, History, ExternalLink, Bell, Check, AlertCircle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";

const STATUSES = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["qualified", "Qualified"],
  ["proposal", "Proposal"],
  ["won", "Won"],
  ["lost", "Lost"],
];

const statusLabel = (value) => STATUSES.find(([id]) => id === value)?.[1] || value;

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0 });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [followUpFilter, setFollowUpFilter] = useState("all");
  const [notes, setNotes] = useState("");
  const [nextFollowUpAt, setNextFollowUpAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [convertOpen, setConvertOpen] = useState(false);
  const [convertTarget, setConvertTarget] = useState(null);
  const [convertBusy, setConvertBusy] = useState(false);
  const [convertSuccess, setConvertSuccess] = useState(null);
  const [convertForm, setConvertForm] = useState({
    title: "",
    category: "OTHER",
    type: "",
    status: "draft",
  });

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const [leadResponse, statsResponse] = await Promise.all([
        api.get("/leads/admin/all", { params: { status, search, limit: 100 } }),
        api.get("/leads/admin/stats"),
      ]);
      setLeads(leadResponse.data?.data || []);
      setStats(statsResponse.data?.data || {});
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [status]);

  useEffect(() => {
    const timer = setTimeout(load, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const followUps = useMemo(() => {
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTomorrow = new Date(startToday);
    startTomorrow.setDate(startTomorrow.getDate() + 1);
    const startDayAfter = new Date(startTomorrow);
    startDayAfter.setDate(startDayAfter.getDate() + 1);

    return leads
      .filter((lead) => lead.nextFollowUpAt)
      .map((lead) => {
        const date = new Date(lead.nextFollowUpAt);
        let bucket = "upcoming";
        if (date < startToday) bucket = "overdue";
        else if (date < startTomorrow) bucket = "today";
        else if (date < startDayAfter) bucket = "tomorrow";
        return { ...lead, followUpDate: date, followUpBucket: bucket };
      })
      .filter((lead) => followUpFilter === "all" || lead.followUpBucket === followUpFilter)
      .sort((a, b) => a.followUpDate - b.followUpDate);
  }, [leads, followUpFilter]);

  const followUpCounts = useMemo(() => {
    const counts = { overdue: 0, today: 0, tomorrow: 0, upcoming: 0 };
    leads.forEach((lead) => {
      if (!lead.nextFollowUpAt) return;
      const date = new Date(lead.nextFollowUpAt);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(tomorrow); dayAfter.setDate(dayAfter.getDate() + 1);
      if (date < today) counts.overdue++;
      else if (date < tomorrow) counts.today++;
      else if (date < dayAfter) counts.tomorrow++;
      else counts.upcoming++;
    });
    return counts;
  }, [leads]);

  const visible = useMemo(() => leads, [leads]);

  const openLead = (lead) => {
    setSelected(lead);
    setNotes(lead.notes || "");
    setNextFollowUpAt(lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt).toISOString().slice(0, 16) : "");
  };

  const update = async (id, payload) => {
    try {
      setSaving(true);
      const response = await api.patch(`/leads/admin/${id}`, payload);
      setLeads((items) => items.map((item) => item._id === id ? response.data.data : item));
      setSelected((item) => item?._id === id ? response.data.data : item);
      const statsResponse = await api.get("/leads/admin/stats");
      setStats(statsResponse.data?.data || {});
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update lead.");
    } finally {
      setSaving(false);
    }
  };

  const openConvert = (lead) => {
    if (!lead) return;

    setConvertTarget(lead);
    setConvertForm({
      title: lead.company || lead.name || "",
      category: lead.service
        ? String(lead.service).toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 30)
        : "OTHER",
      type: lead.service || "Website Project",
      status: "draft",
    });
    setConvertSuccess(null);

    // Close the detail drawer first so the conversion modal is the only active layer.
    setSelected(null);
    setConvertOpen(true);
  };

  const closeConvert = () => {
    if (convertBusy) return;
    setConvertOpen(false);
    setConvertTarget(null);
  };

  const getReferenceUrl = (lead) => {
    const value = String(lead?.websiteUrl || "").trim();
    return /^https?:\/\//i.test(value) ? value : "";
  };

  const convertLead = async () => {
    if (!convertTarget || !convertForm.title.trim()) return;
    try {
      setConvertBusy(true);
      setError("");
      const response = await api.post(
        `/leads/admin/${convertTarget._id}/convert`,
        convertForm
      );
      const updatedLead = response.data?.data?.lead;
      const project = response.data?.data?.project;

      if (updatedLead) {
        setLeads((items) =>
          items.map((item) =>
            item._id === updatedLead._id ? updatedLead : item
          )
        );
      }

      setConvertOpen(false);
      setConvertSuccess({
        projectId: project?._id || updatedLead?.convertedProjectId || null,
        title: project?.title || convertForm.title,
      });
      setConvertTarget(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to convert this lead to a project."
      );
    } finally {
      setConvertBusy(false);
    }
  };

  const onMarkContacted = async (lead) => {
    await update(lead._id, {
      lastContactedAt: new Date().toISOString(),
      nextFollowUpAt: null,
    });
  };

  const remove = async (lead) => {
    if (!window.confirm(`Delete lead from ${lead.name}?`)) return;
    try {
      await api.delete(`/leads/admin/${lead._id}`);
      setLeads((items) => items.filter((item) => item._id !== lead._id));
      if (selected?._id === lead._id) setSelected(null);
      const statsResponse = await api.get("/leads/admin/stats");
      setStats(statsResponse.data?.data || {});
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete lead.");
    }
  };

  return (
    <AdminLayout title="Leads" eyebrow="Business CRM">
      <div className="admin-page">
        <section className="admin-page-heading compact">
          <div><div className="admin-eyebrow"><span /> SALES PIPELINE</div><h1>Leads</h1><p>Turn website enquiries into an organized sales pipeline.</p></div>
        </section>

        {error && <div className="admin-alert error">{error}<button onClick={load}>Retry</button></div>}

        <section className="lead-stats-grid">
          <Stat label="Total leads" value={stats.total || 0} icon={UserRound} />
          <Stat label="New" value={stats.new || 0} icon={Clock3} />
          <Stat label="Qualified" value={stats.qualified || 0} icon={CheckCircle2} />
          <Stat label="Proposal" value={stats.proposal || 0} icon={FileText} />
          <Stat label="Won" value={stats.won || 0} icon={Trophy} />
        </section>

        <section className="lead-followup-dashboard">
          <div className="lead-followup-header">
            <div><div className="admin-eyebrow"><span /> FOLLOW-UP CONTROL</div><h2>Follow-ups</h2><p>Never lose a promising enquiry because you forgot to follow up.</p></div>
            <div className="lead-followup-filters">
              {[['all','All'],['overdue','Overdue'],['today','Today'],['tomorrow','Tomorrow'],['upcoming','Upcoming']].map(([id,label]) => (
                <button key={id} className={followUpFilter === id ? 'active' : ''} onClick={() => setFollowUpFilter(id)}>{label}{id !== 'all' && <b>{followUpCounts[id]}</b>}</button>
              ))}
            </div>
          </div>
          <div className="lead-followup-cards">
            <button className="lead-followup-card overdue" onClick={() => setFollowUpFilter('overdue')}><AlertCircle size={17}/><strong>{followUpCounts.overdue}</strong><span>Overdue</span></button>
            <button className="lead-followup-card today" onClick={() => setFollowUpFilter('today')}><Bell size={17}/><strong>{followUpCounts.today}</strong><span>Today</span></button>
            <button className="lead-followup-card tomorrow" onClick={() => setFollowUpFilter('tomorrow')}><Clock3 size={17}/><strong>{followUpCounts.tomorrow}</strong><span>Tomorrow</span></button>
            <button className="lead-followup-card upcoming" onClick={() => setFollowUpFilter('upcoming')}><CalendarClock size={17}/><strong>{followUpCounts.upcoming}</strong><span>Upcoming</span></button>
          </div>
          {followUps.length > 0 && <div className="lead-followup-list">
            {followUps.slice(0, 8).map((lead) => (
              <div className={`lead-followup-item ${lead.followUpBucket}`} key={lead._id} onClick={() => openLead(lead)}>
                <div className="lead-followup-date"><strong>{lead.followUpDate.toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</strong><span>{lead.followUpDate.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</span></div>
                <div className="lead-followup-person"><strong>{lead.name}</strong><span>{lead.company || lead.email} · {lead.service || 'Website enquiry'}</span></div>
                <span className={`admin-status ${lead.status}`}>{statusLabel(lead.status)}</span>
                <button className="lead-followup-done" title="Mark contacted" onClick={(e) => { e.stopPropagation(); onMarkContacted(lead); }}><Check size={14}/></button>
              </div>
            ))}
          </div>}
          {followUps.length === 0 && <div className="lead-followup-empty">No follow-ups in this view.</div>}
        </section>

        <section className="admin-panel admin-table-panel">
          <div className="admin-toolbar">
            <div className="admin-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, company, email..." />{search && <button onClick={() => setSearch("")}><X size={14} /></button>}</div>
            <div className="admin-filters"><div className="admin-filter"><Filter size={14} /><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="ALL">All stages</option>{STATUSES.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div></div>
          </div>

          {loading ? <div className="admin-table-loading">Loading leads...</div> : visible.length ? (
            <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Lead</th><th>Service</th><th>Budget</th><th>Status</th><th>Received</th><th /></tr></thead><tbody>
              {visible.map((lead) => <tr key={lead._id} onClick={() => openLead(lead)} className="lead-row">
                <td><div className="lead-person"><div className="lead-avatar">{(lead.name || "L").slice(0,1).toUpperCase()}</div><div><strong>{lead.name}</strong><span>{lead.company || lead.email}</span></div></div></td>
                <td><span className="admin-category">{lead.service || "Website enquiry"}</span></td>
                <td><span className="admin-muted">{lead.budget || "Custom Quote"}</span></td>
                <td><span className={`admin-status ${lead.status}`}>{statusLabel(lead.status)}</span></td>
                <td><span className="admin-muted">{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span></td>
                <td><button className="lead-delete" onClick={(e) => { e.stopPropagation(); remove(lead); }} title="Delete"><Trash2 size={14} /></button></td>
              </tr>)}
            </tbody></table></div>
          ) : <div className="admin-empty table-empty"><MessageSquare size={28} /><strong>No leads yet</strong><span>Website enquiries will appear here automatically.</span></div>}
        </section>

        {selected && <LeadDrawer lead={selected} notes={notes} setNotes={setNotes} nextFollowUpAt={nextFollowUpAt} setNextFollowUpAt={setNextFollowUpAt} saving={saving} onClose={() => setSelected(null)} onUpdate={update} onConvert={() => openConvert(selected)} />}
        {convertSuccess && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal lead-convert-modal lead-convert-success">
              <div className="lead-success-icon"><CheckCircle2 size={22} /></div>
              <div className="admin-eyebrow"><span /> PROJECT CREATED</div>
              <h2>{convertSuccess.title}</h2>
              <p>The lead was converted successfully. The original lead remains saved with its sales history.</p>
              <div className="lead-success-actions">
                <button type="button" className="admin-secondary-button" onClick={() => setConvertSuccess(null)}>Done</button>
                <button
                  type="button"
                  className="admin-primary-button"
                  onClick={() => {
                    window.location.href = "/admin/projects";
                  }}
                >
                  Open Projects
                </button>
              </div>
            </div>
          </div>
        )}

        {convertOpen && convertTarget && (
          <div className="admin-modal-backdrop">
            <div className="admin-modal lead-convert-modal">
              <button type="button" className="lead-convert-close" onClick={closeConvert} disabled={convertBusy} aria-label="Close">
                <X size={18} />
              </button>

              <div className="admin-eyebrow"><span /> CONVERT LEAD</div>
              <h2>Create project from {convertTarget.name}</h2>
              <p className="lead-convert-description">
                Saved customer requirements stay on the lead while the project fields below are pre-filled.
              </p>

              <div className="lead-convert-summary">
                <div><span>CLIENT</span><strong>{convertTarget.company || convertTarget.name || "Not provided"}</strong></div>
                <div><span>SERVICE</span><strong>{convertTarget.service || "Website Project"}</strong></div>
                <div><span>BUDGET</span><strong>{convertTarget.budget || "Custom Quote"}</strong></div>
                <div><span>GOAL</span><strong>{convertTarget.projectGoal || "Not provided"}</strong></div>
              </div>

              {getReferenceUrl(convertTarget) && (
                <a className="lead-convert-reference" href={getReferenceUrl(convertTarget)} target="_blank" rel="noreferrer">
                  <ExternalLink size={13} /> Open reference website
                </a>
              )}

              <label>Project title
                <input value={convertForm.title} onChange={(e) => setConvertForm({...convertForm, title: e.target.value})} />
              </label>

              <div className="lead-convert-two-col">
                <label>Category
                  <input value={convertForm.category} onChange={(e) => setConvertForm({...convertForm, category: e.target.value})} />
                </label>
                <label>Project type
                  <input value={convertForm.type} onChange={(e) => setConvertForm({...convertForm, type: e.target.value})} />
                </label>
              </div>

              <label>Initial status
                <select value={convertForm.status} onChange={(e) => setConvertForm({...convertForm, status: e.target.value})}>
                  <option value="draft">Draft</option>
                  <option value="in-progress">In Process — Coming Soon</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <div className="admin-modal-actions">
                <button className="admin-secondary-button" onClick={closeConvert} disabled={convertBusy}>Cancel</button>
                <button className="admin-primary-button" onClick={convertLead} disabled={convertBusy || !convertForm.title.trim()}>
                  {convertBusy ? "Creating..." : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function Stat({ label, value, icon: Icon }) {
  return <div className="lead-stat-card"><div className="lead-stat-icon"><Icon size={17} /></div><div><strong>{value}</strong><span>{label}</span></div></div>;
}

function LeadDrawer({ lead, notes, setNotes, nextFollowUpAt, setNextFollowUpAt, saving, onClose, onUpdate, onConvert }) {
  return <div className="lead-drawer-backdrop" onMouseDown={onClose}>
    <aside className="lead-drawer" onMouseDown={(e) => e.stopPropagation()}>
      <header className="lead-drawer-header"><div><div className="admin-eyebrow"><span /> LEAD DETAILS</div><h2>{lead.name}</h2><p>{lead.company || "Independent enquiry"}</p></div><button className="admin-icon-button" onClick={onClose}><X size={17} /></button></header>
      <div className="lead-drawer-body">
        <div className="lead-contact-grid"><a href={`mailto:${lead.email}`}><Mail size={15} />{lead.email}</a>{lead.mobile && <><a href={`tel:${lead.mobile}`}><Phone size={15} />{lead.mobile}</a><a href={`https://wa.me/${String(lead.mobile).replace(/\D/g, "")}`} target="_blank" rel="noreferrer"><MessageSquare size={15} />WhatsApp</a></>}{lead.websiteUrl && <a href={lead.websiteUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} />Website</a>}{lead.company && <div><Building2 size={15} />{lead.company}</div>}</div>
        <div className="lead-detail-block"><span className="lead-detail-label">Project</span><strong>{lead.service || "Website enquiry"}</strong><span>{lead.customerType} · {lead.budget || "Custom Quote"}</span></div>
        {lead.projectGoal && <div className="lead-detail-block"><span className="lead-detail-label">Project goal</span><p>{lead.projectGoal}</p></div>}
        {lead.message && <div className="lead-detail-block"><span className="lead-detail-label">Message</span><p>{lead.message}</p></div>}
        <div className="lead-detail-block"><span className="lead-detail-label">Project requirements</span><div className="lead-requirements"><div><strong>Business</strong><span>{lead.company || "Not provided"}</span></div><div><strong>Goal</strong><span>{lead.projectGoal || "Not provided"}</span></div><div><strong>Pages</strong><span>{lead.pages || "Not provided"}</span></div><div><strong>Reference</strong><span>{lead.reference ? (/^https?:\/\//i.test(lead.reference) ? <a href={lead.reference} target="_blank" rel="noreferrer">{lead.reference}</a> : lead.reference) : "Not provided"}</span></div><div><strong>Website</strong><span>{lead.websiteUrl || "Not provided"}</span></div><div><strong>Plan</strong><span>{lead.plan || "Custom / Not selected"}</span></div><div><strong>Add-ons</strong><span>{lead.addons || "None"}</span></div><div><strong>Services</strong><span>{lead.services || "Not provided"}</span></div></div></div>
        <div className="lead-detail-block"><span className="lead-detail-label">Next follow-up</span><div className="lead-followup-row"><CalendarClock size={15} /><input type="datetime-local" value={nextFollowUpAt} onChange={(e) => setNextFollowUpAt(e.target.value)} /><button className="admin-secondary-button" disabled={saving} onClick={() => onUpdate(lead._id, { nextFollowUpAt: nextFollowUpAt || null })}>Save</button></div></div>
        <div className="lead-detail-block"><span className="lead-detail-label">Last contacted</span><div className="lead-last-contacted">{lead.lastContactedAt ? new Date(lead.lastContactedAt).toLocaleString("en-IN") : "Not contacted yet"}</div></div>
        {!lead.convertedProjectId && lead.status !== "lost" && (
          <div className="lead-convert-card">
            <div><strong>Ready to become a project?</strong><span>Carry this lead's requirements into Projects without retyping them.</span></div>
            <button type="button" className="admin-primary-button" disabled={saving} onClick={onConvert}>Convert to Project</button>
          </div>
        )}
        {lead.convertedProjectId && (
          <div className="lead-converted-card"><strong>Converted to project</strong><span>{lead.convertedAt ? new Date(lead.convertedAt).toLocaleString("en-IN") : ""}</span></div>
        )}
        <div className="lead-detail-block"><span className="lead-detail-label">Pipeline stage</span>
          <div className="lead-status-row">
            {[
              ["new", "New"],
              ["contacted", "Contacted"],
              ["qualified", "Qualified"],
              ["proposal", "Proposal"],
              ["won", "Won"],
              ["lost", "Lost"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`lead-status-select ${lead.status === value ? "active" : ""}`}
                disabled={saving}
                onClick={() => onUpdate(lead._id, { status: value })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="lead-detail-block"><span className="lead-detail-label">Activity timeline</span><div className="lead-activity-timeline">{(lead.activities || []).slice().reverse().map((activity, index) => <div className="lead-activity" key={`${activity.createdAt}-${index}`}><div className="lead-activity-dot" /><div><strong>{String(activity.type || "").replace(/_/g, " ")}</strong><p>{activity.message || "Activity recorded."}</p><time>{activity.createdAt ? new Date(activity.createdAt).toLocaleString("en-IN") : ""}</time></div></div>)}</div></div><div className="lead-detail-block"><span className="lead-detail-label">Internal notes</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes about this lead..." /><button className="admin-primary-button" disabled={saving} onClick={() => onUpdate(lead._id, { notes })}>Save notes</button></div>
      </div>
    </aside>
  </div>;
}
