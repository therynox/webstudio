import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  GripVertical,
  FolderKanban,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";
import { getMediaUrl } from "../../utils/media";

const SECTION_DEFAULTS = [
  { key: "hero", label: "Hero", visible: true, order: 1 },
  { key: "stats", label: "Stats", visible: true, order: 2 },
  { key: "technology", label: "Technology", visible: true, order: 3 },
  { key: "work", label: "Selected Work", visible: true, order: 4 },
  { key: "process", label: "Process", visible: true, order: 5 },
  { key: "pricing", label: "Pricing", visible: true, order: 6 },
  { key: "contact", label: "Final CTA", visible: true, order: 7 },
];

const fallback = {
  sections: SECTION_DEFAULTS,
  hero: { enabled: true, badge: "THERYNOX WEB STUDIO", title: "Digital experiences built to move businesses.", description: "Strategy, design and development working together to create powerful digital products.", primaryCtaText: "Start a project", primaryCtaUrl: "/contact", secondaryCtaText: "View our work", secondaryCtaUrl: "/work", projectIds: [], autoplay: true, autoplayDuration: 5000 },
  stats: { enabled: true, eyebrow: "THERYNOX WEB STUDIO", title: "Digital products built for ambitious businesses.", description: "Strategy, design and development working together to create digital experiences that actually move businesses forward.", items: [{number:"25+",label:"Digital Projects",visible:true},{number:"15+",label:"Business Systems",visible:true},{number:"10+",label:"Industries Served",visible:true},{number:"100%",label:"Built With Purpose",visible:true}] },
  technology: { enabled: true, eyebrow: "Technology", title: "Built with modern technology.", description: "Modern tools and thoughtful engineering behind every digital experience." },
  work: { enabled: true, eyebrow: "Selected Work", title: "Work that moves businesses.", description: "A selection of websites, commerce platforms and digital systems built by THERYNOX WEB STUDIO." },
  process: { enabled: true, eyebrow: "How we work", title: "From idea to launch.", description: "A clear process. No unnecessary complexity." },
  pricing: { enabled: true, eyebrow: "Pricing", title: "Choose the right starting point.", description: "Flexible packages for businesses at different stages." },
  contact: { enabled: true, eyebrow: "Have a project in mind?", title: "Let's build something worth remembering.", description: "Tell us what you're building. We'll help turn your idea into a powerful digital experience.", ctaText: "Start a project", ctaUrl: "/contact" },
  seo: { title: "THERYNOX Web Studio | Digital Experiences", description: "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses.", keywords: "web design, web development, e-commerce, digital agency, THERYNOX", ogImage: "" },
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function Field({ label, value, onChange, textarea = false, placeholder = "" }) {
  return (
    <label className="home-editor-field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} />
      ) : (
        <input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="home-editor-toggle">
      <input type="checkbox" checked={checked !== false} onChange={(e) => onChange(e.target.checked)} />
      <span className="home-editor-switch" aria-hidden="true"><span /></span>
      <b>{label}</b>
    </label>
  );
}

export default function HomepageEditor() {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [dragKey, setDragKey] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  useEffect(() => {
    api.get("/homepage/admin")
      .then((r) => {
        const incoming = r.data.data || {};
        const sections = Array.isArray(incoming.sections) && incoming.sections.length
          ? incoming.sections
          : SECTION_DEFAULTS;
        setData({
          ...fallback,
          ...incoming,
          hero: { ...fallback.hero, ...(incoming.hero || {}) },
          stats: { ...fallback.stats, ...(incoming.stats || {}) },
          technology: { ...fallback.technology, ...(incoming.technology || {}) },
          work: { ...fallback.work, ...(incoming.work || {}) },
          process: { ...fallback.process, ...(incoming.process || {}) },
          pricing: { ...fallback.pricing, ...(incoming.pricing || {}) },
          contact: { ...fallback.contact, ...(incoming.contact || {}) },
          seo: { ...fallback.seo, ...(incoming.seo || {}) },
          sections: sections.map((section, index) => ({ ...section, order: index + 1 })),
        });
      })
      .catch((e) => setError(e.response?.data?.message || "Unable to load homepage settings."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        setProjectsLoading(true);
        const response = await api.get("/projects");
        if (!mounted) return;

        const items = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setProjects(items);
      } catch (e) {
        console.error("HERO PROJECTS LOAD ERROR:", e);
        if (mounted) {
          setError((current) => current || "Unable to load projects for Hero selection.");
        }
      } finally {
        if (mounted) setProjectsLoading(false);
      }
    };

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const heroProjectIds = Array.isArray(data.hero?.projectIds)
    ? data.hero.projectIds.map((id) => String(id))
    : [];

  const toggleHeroProject = (projectId) => {
    const id = String(projectId);
    const current = heroProjectIds;

    if (current.includes(id)) {
      update(
        "hero.projectIds",
        current.filter((item) => item !== id)
      );
    } else {
      update("hero.projectIds", [...current, id]);
    }
  };

  const moveHeroProject = (index, direction) => {
    const ids = [...heroProjectIds];
    const next = index + direction;

    if (next < 0 || next >= ids.length) return;

    [ids[index], ids[next]] = [ids[next], ids[index]];
    update("hero.projectIds", ids);
  };

  const update = (path, value) => {
    setData((current) => {
      const next = clone(current);
      const keys = path.split(".");
      let cursor = next;
      keys.slice(0, -1).forEach((k) => { cursor[k] = cursor[k] || {}; cursor = cursor[k]; });
      cursor[keys[keys.length - 1]] = value;
      return next;
    });
    setSaved(false);
  };

  const setSectionVisible = (key, visible) => {
    setData((current) => ({
      ...current,
      [key]: current[key] && key !== "seo" ? { ...current[key], enabled: visible } : current[key],
      sections: current.sections.map((section) => section.key === key ? { ...section, visible } : section),
    }));
    setSaved(false);
  };

  const reorder = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= data.sections.length || fromIndex === toIndex) return;
    setData((current) => {
      const sections = [...current.sections];
      const [moved] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, moved);
      return { ...current, sections: sections.map((section, index) => ({ ...section, order: index + 1 })) };
    });
    setSaved(false);
  };

  const save = async () => {
    try {
      setSaving(true);
      setError("");
      const payload = {
        ...data,
        hero: {
          ...data.hero,
          projectIds: Array.isArray(data.hero?.projectIds)
            ? data.hero.projectIds.map((id) => String(id))
            : [],
          autoplay: data.hero?.autoplay !== false,
          autoplayDuration: Number(data.hero?.autoplayDuration) || 5000,
        },
        sections: data.sections.map((section, index) => ({ ...section, order: index + 1 })),
      };

      const response = await api.put("/homepage/admin", payload);
      const savedData = response.data?.data || {};

      // Normalize IDs immediately after save. Mongoose may return ObjectIds while
      // the checkbox state uses strings. Without this normalization a selected
      // project can visually become unchecked after clicking Save.
      const normalizedProjectIds = Array.isArray(savedData.hero?.projectIds)
        ? savedData.hero.projectIds.map((id) => String(id))
        : payload.hero.projectIds;

      setData((current) => ({
        ...current,
        ...savedData,
        hero: {
          ...current.hero,
          ...(savedData.hero || {}),
          projectIds: normalizedProjectIds,
        },
        sections: savedData.sections || current.sections,
      }));

      setSaved(true);
    } catch (e) {
      setError(e.response?.data?.message || "Unable to save homepage.");
    } finally {
      setSaving(false);
    }
  };

  const addStat = () => update("stats.items", [...(data.stats.items || []), { number: "", label: "", visible: true }]);
  const removeStat = (index) => update("stats.items", (data.stats.items || []).filter((_, i) => i !== index));
  const moveStat = (index, direction) => {
    const items = [...data.stats.items];
    const next = index + direction;
    if (next < 0 || next >= items.length) return;
    [items[index], items[next]] = [items[next], items[index]];
    update("stats.items", items);
  };

  const visibleCount = useMemo(() => data.sections.filter((section) => section.visible !== false).length, [data.sections]);

  if (loading) return <AdminLayout title="Homepage"><div className="admin-table-loading"><Loader2 className="spin" size={18} /> Loading homepage...</div></AdminLayout>;

  return (
    <AdminLayout title="Homepage">
      <div className="admin-page homepage-editor-page">
        <section className="admin-page-heading compact">
          <div>
            <div className="admin-eyebrow"><span /> WEBSITE / HOMEPAGE</div>
            <h1>Homepage Editor</h1>
            <p>Manage content, visibility and the exact order of sections on your public homepage.</p>
          </div>
          <div className="home-editor-heading-actions">
            <a className="admin-secondary-button" href="/" target="_blank" rel="noreferrer"><Eye size={15} /> Preview website</a>
            <button className="admin-primary-button" onClick={save} disabled={saving}>{saving ? <Loader2 size={15} className="spin" /> : <Save size={15} />} {saving ? "Saving..." : saved ? "Saved" : "Save changes"}</button>
          </div>
        </section>

        {error && <div className="admin-alert error">{error}</div>}

        <section className="home-section-manager admin-panel">
          <div className="home-section-manager-head">
            <div>
              <div className="admin-eyebrow"><span /> SECTION MANAGER</div>
              <h2>Homepage structure</h2>
              <p>Drag sections to reorder them. Toggle visibility to control what visitors see.</p>
            </div>
            <div className="home-section-manager-meta"><strong>{visibleCount}</strong><span>of {data.sections.length} visible</span></div>
          </div>

          <div className="home-section-list">
            {data.sections.map((section, index) => (
              <div
                key={section.key}
                className={`home-section-row ${section.visible === false ? "is-hidden" : ""} ${dragKey === section.key ? "is-dragging" : ""}`}
                draggable
                onDragStart={() => setDragKey(section.key)}
                onDragEnd={() => setDragKey(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  const from = data.sections.findIndex((item) => item.key === dragKey);
                  reorder(from, index);
                  setDragKey(null);
                }}
              >
                <div className="home-section-drag" title="Drag to reorder"><GripVertical size={18} /></div>
                <div className="home-section-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="home-section-copy">
                  <strong>{section.label}</strong>
                  <span>{section.visible === false ? "Hidden from public homepage" : `Visible · Position ${index + 1}`}</span>
                </div>
                <div className="home-section-actions">
                  <button type="button" onClick={() => reorder(index, index - 1)} disabled={index === 0} aria-label={`Move ${section.label} up`}><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => reorder(index, index + 1)} disabled={index === data.sections.length - 1} aria-label={`Move ${section.label} down`}><ArrowDown size={14} /></button>
                  <button type="button" className="home-section-visibility" onClick={() => setSectionVisible(section.key, section.visible === false)} aria-label={`${section.visible === false ? "Show" : "Hide"} ${section.label}`}>
                    {section.visible === false ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="home-section-manager-note"><Check size={14} /> The order and visibility are saved with the rest of your homepage content.</div>
        </section>

        <div className="home-editor-grid">
          <section className="admin-panel home-editor-card">
            <div className="home-editor-card-head"><div><span className="home-editor-index">01</span><h2>Hero</h2><p>The first message visitors see.</p></div><Toggle label="Visible" checked={data.hero.enabled} onChange={(v) => setSectionVisible("hero", v)} /></div>
            <Field label="Badge" value={data.hero.badge} onChange={(v) => update("hero.badge", v)} />
            <Field label="Headline" value={data.hero.title} onChange={(v) => update("hero.title", v)} textarea />
            <Field label="Description" value={data.hero.description} onChange={(v) => update("hero.description", v)} textarea />
            <div className="home-editor-two"><Field label="Primary CTA" value={data.hero.primaryCtaText} onChange={(v) => update("hero.primaryCtaText", v)} /><Field label="Primary URL" value={data.hero.primaryCtaUrl} onChange={(v) => update("hero.primaryCtaUrl", v)} /></div>
            <div className="home-editor-two"><Field label="Secondary CTA" value={data.hero.secondaryCtaText} onChange={(v) => update("hero.secondaryCtaText", v)} /><Field label="Secondary URL" value={data.hero.secondaryCtaUrl} onChange={(v) => update("hero.secondaryCtaUrl", v)} /></div>

            <div className="hero-project-control">
              <div className="hero-project-control-head">
                <div>
                  <span className="home-editor-index">HERO PROJECTS</span>
                  <h3>Choose projects for the Hero</h3>
                  <p>Select the exact projects shown in the homepage Hero. The order below controls the rotation order.</p>
                </div>
                <span className="hero-project-count">{heroProjectIds.length} selected</span>
              </div>

              <div className="hero-project-settings">
                <Toggle
                  label="Auto rotate"
                  checked={data.hero.autoplay !== false}
                  onChange={(value) => update("hero.autoplay", value)}
                />
                <label className="hero-duration-field">
                  <span>Slide duration</span>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={data.hero.autoplayDuration || 5000}
                    onChange={(e) => update("hero.autoplayDuration", Number(e.target.value) || 5000)}
                  />
                  <small>ms</small>
                </label>
              </div>

              {projectsLoading ? (
                <div className="hero-project-loading"><Loader2 size={15} className="spin" /> Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="hero-project-empty">No projects found. Create a project first.</div>
              ) : (
                <div className="hero-project-list">
                  {projects.map((project) => {
                    const id = String(project._id);
                    const selectedIndex = heroProjectIds.indexOf(id);
                    const selected = selectedIndex !== -1;
                    const imageUrl = project.coverImage ? getMediaUrl(project.coverImage) : "";

                    return (
                      <div key={id} className={`hero-project-row ${selected ? "is-selected" : ""}`}>
                        <button
                          type="button"
                          className={`hero-project-check ${selected ? "checked" : ""}`}
                          onClick={() => toggleHeroProject(id)}
                          aria-label={`${selected ? "Remove" : "Add"} ${project.title} from Hero`}
                        >
                          {selected ? <Check size={13} /> : null}
                        </button>

                        <div className="hero-project-thumb">
                          {imageUrl ? (
                            <img src={imageUrl} alt="" />
                          ) : (
                            <FolderKanban size={17} />
                          )}
                        </div>

                        <div className="hero-project-info">
                          <strong>{project.title}</strong>
                          <span>{project.category || "PROJECT"} · {project.year || "—"} · {project.status || "draft"}</span>
                        </div>

                        {selected ? (
                          <div className="hero-project-order">
                            <b>{String(selectedIndex + 1).padStart(2, "0")}</b>
                            <button type="button" onClick={() => moveHeroProject(selectedIndex, -1)} disabled={selectedIndex === 0} aria-label="Move project up"><ArrowUp size={13} /></button>
                            <button type="button" onClick={() => moveHeroProject(selectedIndex, 1)} disabled={selectedIndex === heroProjectIds.length - 1} aria-label="Move project down"><ArrowDown size={13} /></button>
                          </div>
                        ) : (
                          <span className="hero-project-add-label">Not selected</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="hero-project-note">
                <Check size={13} /> If no project is selected yet, the public Hero falls back to published projects.
              </div>
            </div>
          </section>

          <section className="admin-panel home-editor-card">
            <div className="home-editor-card-head"><div><span className="home-editor-index">02</span><h2>Stats</h2><p>Proof points displayed below the hero.</p></div><Toggle label="Visible" checked={data.stats.enabled} onChange={(v) => setSectionVisible("stats", v)} /></div>
            <Field label="Eyebrow" value={data.stats.eyebrow} onChange={(v) => update("stats.eyebrow", v)} />
            <Field label="Heading" value={data.stats.title} onChange={(v) => update("stats.title", v)} textarea />
            <Field label="Description" value={data.stats.description} onChange={(v) => update("stats.description", v)} textarea />
            <div className="home-editor-list">{(data.stats.items || []).map((item, index) => <div className="home-editor-stat" key={index}><GripVertical size={16} /><Field label={`Number ${index + 1}`} value={item.number} onChange={(v) => { const items=[...data.stats.items]; items[index]={...items[index],number:v}; update("stats.items",items); }} /><Field label="Label" value={item.label} onChange={(v) => { const items=[...data.stats.items]; items[index]={...items[index],label:v}; update("stats.items",items); }} /><Toggle label="Show" checked={item.visible} onChange={(v) => { const items=[...data.stats.items]; items[index]={...items[index],visible:v}; update("stats.items",items); }} /><div className="home-editor-row-actions"><button onClick={() => moveStat(index,-1)} disabled={index===0}><ChevronDown size={14} style={{transform:"rotate(180deg)"}} /></button><button onClick={() => moveStat(index,1)} disabled={index===data.stats.items.length-1}><ChevronDown size={14} /></button><button onClick={() => removeStat(index)}><Trash2 size={14}/></button></div></div>)}</div>
            <button className="admin-secondary-button" onClick={addStat}><Plus size={14}/> Add stat</button>
          </section>

          {["technology","work","process","pricing"].map((key, index) => <section className="admin-panel home-editor-card" key={key}><div className="home-editor-card-head"><div><span className="home-editor-index">0{index+3}</span><h2>{key === "work" ? "Selected Work" : key[0].toUpperCase()+key.slice(1)}</h2><p>Control the section visibility and messaging.</p></div><Toggle label="Visible" checked={data[key]?.enabled} onChange={(v) => setSectionVisible(key,v)} /></div><Field label="Eyebrow" value={data[key]?.eyebrow} onChange={(v) => update(`${key}.eyebrow`,v)} /><Field label="Heading" value={data[key]?.title} onChange={(v) => update(`${key}.title`,v)} /><Field label="Description" value={data[key]?.description} onChange={(v) => update(`${key}.description`,v)} textarea /></section>)}

          <section className="admin-panel home-editor-card"><div className="home-editor-card-head"><div><span className="home-editor-index">07</span><h2>Final CTA</h2><p>Close the homepage with a strong conversion message.</p></div><Toggle label="Visible" checked={data.contact.enabled} onChange={(v) => setSectionVisible("contact",v)} /></div><Field label="Eyebrow" value={data.contact.eyebrow} onChange={(v) => update("contact.eyebrow",v)} /><Field label="Heading" value={data.contact.title} onChange={(v) => update("contact.title",v)} textarea /><Field label="Description" value={data.contact.description} onChange={(v) => update("contact.description",v)} textarea /><div className="home-editor-two"><Field label="Button text" value={data.contact.ctaText} onChange={(v) => update("contact.ctaText",v)} /><Field label="Button URL" value={data.contact.ctaUrl} onChange={(v) => update("contact.ctaUrl",v)} /></div></section>

          <section className="admin-panel home-editor-card"><div className="home-editor-card-head"><div><span className="home-editor-index">08</span><h2>SEO</h2><p>Search engine metadata for the homepage.</p></div></div><Field label="SEO title" value={data.seo.title} onChange={(v) => update("seo.title",v)} /><Field label="SEO description" value={data.seo.description} onChange={(v) => update("seo.description",v)} textarea /><Field label="Keywords" value={data.seo.keywords} onChange={(v) => update("seo.keywords",v)} /><Field label="OG image URL" value={data.seo.ogImage} onChange={(v) => update("seo.ogImage",v)} /></section>
        </div>

        <div className="home-editor-savebar"><span>{saved ? "✓ All homepage changes saved" : "Unsaved changes are kept locally until you click Save homepage."}</span><button className="admin-primary-button" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save homepage"}</button></div>
      </div>
    </AdminLayout>
  );
}
