import React, { useEffect, useMemo, useState } from "react";
import { Check, Eye, Globe2, Save, Search, Share2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";

const tabs = [
  { key: "global", label: "Global SEO" },
  { key: "homepage", label: "Homepage" },
  { key: "project", label: "Projects" },
  { key: "blog", label: "Blog" },
  { key: "service", label: "Services" },
];

const empty = {
  type: "global",
  referenceId: "",
  referenceSlug: "",
  title: "",
  description: "",
  keywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  robotsIndex: true,
  robotsFollow: true,
  schemaType: "",
  schemaJson: "",
};

function Field({ label, hint, children }) {
  return (
    <label className="seo-field">
      <span>{label}</span>
      {hint && <small>{hint}</small>}
      {children}
    </label>
  );
}

export default function SEOManager() {
  const [type, setType] = useState("global");
  const [form, setForm] = useState(empty);
  const [referenceId, setReferenceId] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const query = referenceId
        ? `?type=${type}&referenceId=${encodeURIComponent(referenceId)}`
        : `?type=${type}`;
      const response = await api.get(`/seo/admin${query}`);
      setForm({ ...empty, ...(response.data?.data || {}), type });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load SEO settings.");
    } finally {
      setLoading(false);
    }
  };

  const loadItems = async () => {
    if (!["project", "blog", "service"].includes(type)) {
      setItems([]);
      return;
    }

    try {
      const endpoint = type === "project" ? "/projects" : "/blogs";
      const response = await api.get(endpoint);
      setItems(response.data?.data || []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    load();
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, referenceId]);

  const set = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const save = async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await api.put("/seo", {
        ...form,
        type,
        referenceId,
      });

      setForm({ ...empty, ...(response.data?.data || {}), type });
      setMessage("SEO settings saved successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save SEO settings.");
    } finally {
      setSaving(false);
    }
  };

  const previewTitle =
    form.title || "THERYNOX Web Studio | Premium Digital Experiences";

  const previewDescription =
    form.description ||
    "Premium websites, e-commerce platforms and digital systems built by THERYNOX Web Studio.";

  const previewUrl =
    form.canonicalUrl ||
    "https://therynox.com";

  const selectedItem = useMemo(
    () => items.find((item) => String(item._id) === String(referenceId)),
    [items, referenceId]
  );

  return (
    <AdminLayout title="SEO Manager" eyebrow="Site">
      <div className="seo-manager-page">
        <div className="admin-page-heading seo-heading">
          <div>
            <div className="admin-eyebrow"><Search size={12} /> Search engine optimization</div>
            <h1>SEO Manager</h1>
            <p>Control metadata, social previews, indexing and structured data from one place.</p>
          </div>
          <button className="admin-primary-button" onClick={save} disabled={saving || loading}>
            <Save size={15} /> {saving ? "Saving..." : "Save SEO"}
          </button>
        </div>

        {message && <div className="seo-notice success"><Check size={15} /> {message}</div>}
        {error && <div className="seo-notice error">{error}</div>}

        <div className="seo-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={type === tab.key ? "active" : ""}
              onClick={() => {
                setType(tab.key);
                setReferenceId("");
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {["project", "blog", "service"].includes(type) && (
          <div className="seo-reference-picker">
            <Field label={`${type === "project" ? "Project" : type === "blog" ? "Article" : "Service"} reference`}>
              <select
                value={referenceId}
                onChange={(event) => setReferenceId(event.target.value)}
              >
                <option value="">Select an item</option>
                {items.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title || item.name || item.slug}
                  </option>
                ))}
              </select>
            </Field>
            {selectedItem?.slug && (
              <div className="seo-reference-meta">
                <span>Slug</span>
                <strong>{selectedItem.slug}</strong>
              </div>
            )}
          </div>
        )}

        <div className="seo-layout">
          <section className="seo-card">
            <div className="seo-card-header">
              <div><Globe2 size={17} /><div><strong>Search result</strong><span>Google metadata</span></div></div>
            </div>

            <div className="seo-fields">
              <Field label="SEO title" hint={`${form.title.length}/70`}>
                <input id="seo-title" name="seoTitle" value={form.title} maxLength={70} onChange={(e) => set("title", e.target.value)} placeholder="Page title for search engines" />
              </Field>

              <Field label="SEO description" hint={`${form.description.length}/180`}>
                <textarea id="seo-description" name="seoDescription" value={form.description} maxLength={180} rows={4} onChange={(e) => set("description", e.target.value)} placeholder="Describe this page clearly for search users." />
              </Field>

              <Field label="Keywords" hint="Comma separated">
                <input id="seo-keywords" name="seoKeywords" value={form.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="web design, web development, ecommerce" />
              </Field>

              <Field label="Canonical URL">
                <input id="seo-canonical" name="canonicalUrl" value={form.canonicalUrl} onChange={(e) => set("canonicalUrl", e.target.value)} placeholder="https://therynox.com/page" />
              </Field>
            </div>
          </section>

          <section className="seo-card">
            <div className="seo-card-header">
              <div><Share2 size={17} /><div><strong>Social sharing</strong><span>Open Graph + X/Twitter</span></div></div>
            </div>

            <div className="seo-fields">
              <Field label="OG title">
                <input id="seo-og-title" name="ogTitle" value={form.ogTitle} onChange={(e) => set("ogTitle", e.target.value)} placeholder={previewTitle} />
              </Field>

              <Field label="OG description">
                <textarea id="seo-og-description" name="ogDescription" value={form.ogDescription} rows={3} onChange={(e) => set("ogDescription", e.target.value)} placeholder={previewDescription} />
              </Field>

              <Field label="OG image URL">
                <input id="seo-og-image" name="ogImage" value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="/images/homepage/og.webp" />
              </Field>

              <Field label="Twitter/X image URL">
                <input id="seo-twitter-image" name="twitterImage" value={form.twitterImage} onChange={(e) => set("twitterImage", e.target.value)} placeholder={form.ogImage || "/images/homepage/og.webp"} />
              </Field>
            </div>
          </section>

          <section className="seo-card">
            <div className="seo-card-header">
              <div><Eye size={17} /><div><strong>Indexing</strong><span>Search crawler controls</span></div></div>
            </div>

            <div className="seo-switch-row">
              <label>
                <span><strong>Allow indexing</strong><small>Let search engines index this page.</small></span>
                <input id="seo-index" name="robotsIndex" type="checkbox" checked={form.robotsIndex} onChange={(e) => set("robotsIndex", e.target.checked)} />
              </label>
              <label>
                <span><strong>Follow links</strong><small>Allow crawlers to follow links on this page.</small></span>
                <input id="seo-follow" name="robotsFollow" type="checkbox" checked={form.robotsFollow} onChange={(e) => set("robotsFollow", e.target.checked)} />
              </label>
            </div>

            <div className="seo-fields">
              <Field label="Schema type">
                <input id="seo-schema-type" name="schemaType" value={form.schemaType} onChange={(e) => set("schemaType", e.target.value)} placeholder="WebSite / Article / Organization" />
              </Field>
              <Field label="Custom JSON-LD" hint="Optional valid JSON object">
                <textarea id="seo-schema-json" name="schemaJson" value={form.schemaJson} rows={7} onChange={(e) => set("schemaJson", e.target.value)} placeholder='{"@context":"https://schema.org","@type":"WebSite"}' />
              </Field>
            </div>
          </section>

          <section className="seo-preview-card">
            <div className="seo-preview-label"><Search size={13} /> Google preview</div>
            <div className="seo-google-preview">
              <div className="seo-google-url">{previewUrl.replace(/^https?:\/\//, "")}</div>
              <div className="seo-google-title">{previewTitle}</div>
              <div className="seo-google-description">{previewDescription}</div>
            </div>

            <div className="seo-score">
              <span>SEO completeness</span>
              <strong>
                {[
                  form.title,
                  form.description,
                  form.canonicalUrl,
                  form.ogImage,
                  form.keywords,
                ].filter(Boolean).length}/5
              </strong>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}
