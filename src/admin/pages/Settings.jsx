import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GripVertical,
  Link2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import api from "../../services/api";

const fallback = {
  branding: {
    brandName: "THERYNOX",
    studioName: "WEB STUDIO",
    logoUrl: "",
    faviconUrl: "",
  },
  navigation: {
    services: [],
    solutions: [],
    main: [],
    ctaText: "Start a Project",
    ctaUrl: "/contact",
  },
  footer: {
    description: "",
    email: "hello@therynox.com",
    groups: [],
    social: [],
    copyright: "THERYNOX WEB STUDIO",
    location: "INDIA · WORKING WORLDWIDE",
    privacyUrl: "/privacy",
    termsUrl: "/terms",
  },
  contact: {
    email: "hello@therynox.com",
    phone: "",
    whatsapp: "",
    address: "India · Working Worldwide",
    hours: "Mon – Sat · 10:00 – 19:00",
    mapsUrl: "",
  },
  social: [],
  seo: {
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
    canonicalUrl: "",
    googleVerification: "",
  },
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function Field({ label, value, onChange, textarea = false, placeholder }) {
  return (
    <label className="settings-field">
      <span>{label}</span>
      {textarea ? (
        <textarea
          value={value || ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          value={value || ""}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      className={`settings-switch ${checked ? "on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-label={checked ? "Hide" : "Show"}
    >
      <span />
    </button>
  );
}

function LinkEditor({ title, items, setItems, description }) {
  const update = (index, key, value) => {
    setItems(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    );
  };

  const add = () => {
    setItems([
      ...items,
      {
        label: "New link",
        path: "/",
        visible: true,
        external: false,
      },
    ]);
  };

  const remove = (index) => {
    setItems(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const move = (index, direction) => {
    const next = [...items];
    const target = index + direction;

    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  return (
    <div className="settings-link-editor">
      <div className="settings-subhead">
        <div>
          <strong>{title}</strong>
          <span>{description}</span>
        </div>

        <button className="settings-small-button" onClick={add} type="button">
          <Plus size={14} />
          Add link
        </button>
      </div>

      <div className="settings-link-list">
        {items.map((item, index) => (
          <div className="settings-link-row" key={`${item.label}-${index}`}>
            <GripVertical size={15} className="settings-drag" />

            <div className="settings-link-fields">
              <input
                value={item.label || ""}
                aria-label="Link label"
                onChange={(event) =>
                  update(index, "label", event.target.value)
                }
              />

              <input
                value={item.path || ""}
                aria-label="Link URL"
                onChange={(event) =>
                  update(index, "path", event.target.value)
                }
              />
            </div>

            <div className="settings-row-actions">
              <Toggle
                checked={item.visible !== false}
                onChange={(value) => update(index, "visible", value)}
              />

              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
              >
                <ChevronUp size={14} />
              </button>

              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                <ChevronDown size={14} />
              </button>

              <button
                type="button"
                className="danger"
                onClick={() => remove(index)}
                aria-label="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {!items.length && (
          <div className="settings-empty">
            No links yet. Add your first navigation item.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Settings() {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("navigation");

  useEffect(() => {
    api
      .get("/settings/admin")
      .then((response) =>
        setData({
          ...fallback,
          ...response.data.data,
        })
      )
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to load settings."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const update = (path, value) => {
    setSaved(false);

    setData((current) => {
      const next = clone(current);
      const parts = path.split(".");
      let object = next;

      parts.slice(0, -1).forEach((part) => {
        object[part] = object[part] || {};
        object = object[part];
      });

      object[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await api.put("/settings/admin", data);
      setData(response.data.data);
      setSaved(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  const tabs = useMemo(
    () => [
      ["navigation", "Navigation", "Header links and CTA"],
      ["footer", "Footer", "Footer columns and legal"],
      ["contact", "Contact", "Business contact details"],
      ["branding", "Branding", "Logo and identity"],
      ["seo", "SEO", "Global search metadata"],
    ],
    []
  );

  if (loading) {
    return (
      <AdminLayout title="Settings" eyebrow="Configuration">
        <div className="admin-table-loading">
          Loading global settings...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Settings" eyebrow="Configuration">
      <div className="admin-page settings-page">
        <div className="settings-hero">
          <div>
            <div className="admin-eyebrow">
              <span />
              GLOBAL CONFIGURATION
            </div>

            <h1>Global Settings</h1>

            <p>
              Control navigation, footer, contact details, branding and SEO
              from one place.
            </p>
          </div>

          <div className="settings-hero-actions">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="settings-secondary-button"
            >
              <ExternalLink size={14} />
              Preview website
            </a>

            <button
              className="admin-primary-button"
              onClick={save}
              disabled={saving}
              type="button"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>

        {error && <div className="admin-error-banner">{error}</div>}

        <div className="settings-layout">
          <aside className="settings-tabs">
            <div className="settings-tabs-label">Website</div>

            {tabs.map(([key, label, description]) => (
              <button
                key={key}
                type="button"
                className={tab === key ? "active" : ""}
                onClick={() => setTab(key)}
              >
                <span>
                  <strong>{label}</strong>
                  <small>{description}</small>
                </span>
                <ChevronDown size={14} />
              </button>
            ))}
          </aside>

          <main className="settings-content">
            {tab === "navigation" && (
              <section className="settings-panel">
                <div className="settings-panel-head">
                  <div>
                    <span>01 · HEADER</span>
                    <h2>Navigation</h2>
                    <p>
                      Manage the links visitors see in your main navigation.
                    </p>
                  </div>

                  <div className="settings-status">
                    <span className="dot" />
                    Live site
                  </div>
                </div>

                <LinkEditor
                  title="Main links"
                  description="Primary pages shown beside the dropdowns."
                  items={data.navigation.main || []}
                  setItems={(value) => update("navigation.main", value)}
                />

                <LinkEditor
                  title="Services dropdown"
                  description="Services menu items."
                  items={data.navigation.services || []}
                  setItems={(value) => update("navigation.services", value)}
                />

                <LinkEditor
                  title="Solutions dropdown"
                  description="Business systems menu items."
                  items={data.navigation.solutions || []}
                  setItems={(value) => update("navigation.solutions", value)}
                />

                <div className="settings-grid-two">
                  <Field
                    label="Header CTA text"
                    value={data.navigation.ctaText}
                    onChange={(value) =>
                      update("navigation.ctaText", value)
                    }
                  />

                  <Field
                    label="Header CTA URL"
                    value={data.navigation.ctaUrl}
                    onChange={(value) =>
                      update("navigation.ctaUrl", value)
                    }
                  />
                </div>
              </section>
            )}

            {tab === "footer" && (
              <section className="settings-panel">
                <div className="settings-panel-head">
                  <div>
                    <span>02 · FOOTER</span>
                    <h2>Footer content</h2>
                    <p>
                      Keep footer links, contact and legal information
                      consistent everywhere.
                    </p>
                  </div>
                </div>

                <div className="settings-grid-two">
                  <Field
                    label="Footer email"
                    value={data.footer.email}
                    onChange={(value) =>
                      update("footer.email", value)
                    }
                  />

                  <Field
                    label="Location"
                    value={data.footer.location}
                    onChange={(value) =>
                      update("footer.location", value)
                    }
                  />
                </div>

                <Field
                  label="Footer description"
                  value={data.footer.description}
                  onChange={(value) =>
                    update("footer.description", value)
                  }
                  textarea
                />

                {(data.footer.groups || []).map((group, index) => (
                  <div
                    className="settings-footer-group"
                    key={group._id || index}
                  >
                    <div className="settings-subhead">
                      <Field
                        label="Column title"
                        value={group.title}
                        onChange={(value) =>
                          update(`footer.groups.${index}.title`, value)
                        }
                      />

                      <button
                        className="settings-small-button danger"
                        type="button"
                        onClick={() =>
                          update(
                            "footer.groups",
                            data.footer.groups.filter(
                              (_, itemIndex) => itemIndex !== index
                            )
                          )
                        }
                      >
                        <Trash2 size={14} />
                        Remove column
                      </button>
                    </div>

                    <LinkEditor
                      title={`Column ${index + 1}`}
                      description="Links in this footer column."
                      items={group.links || []}
                      setItems={(value) =>
                        update(`footer.groups.${index}.links`, value)
                      }
                    />
                  </div>
                ))}

                <button
                  className="settings-add-column"
                  type="button"
                  onClick={() =>
                    update("footer.groups", [
                      ...(data.footer.groups || []),
                      { title: "NEW COLUMN", links: [] },
                    ])
                  }
                >
                  <Plus size={15} />
                  Add footer column
                </button>

                <div className="settings-divider" />

                <div className="settings-grid-two">
                  <Field
                    label="Copyright"
                    value={data.footer.copyright}
                    onChange={(value) =>
                      update("footer.copyright", value)
                    }
                  />

                  <Field
                    label="Privacy URL"
                    value={data.footer.privacyUrl}
                    onChange={(value) =>
                      update("footer.privacyUrl", value)
                    }
                  />

                  <Field
                    label="Terms URL"
                    value={data.footer.termsUrl}
                    onChange={(value) =>
                      update("footer.termsUrl", value)
                    }
                  />
                </div>

                <LinkEditor
                  title="Social links"
                  description="Social profiles shown in the footer."
                  items={data.footer.social || []}
                  setItems={(value) =>
                    update("footer.social", value)
                  }
                />
              </section>
            )}

            {tab === "contact" && (
              <section className="settings-panel">
                <div className="settings-panel-head">
                  <div>
                    <span>03 · CONTACT</span>
                    <h2>Contact information</h2>
                    <p>
                      One source of truth for email, phone and business
                      information.
                    </p>
                  </div>
                </div>

                <div className="settings-grid-two">
                  <Field
                    label="Email"
                    value={data.contact.email}
                    onChange={(value) =>
                      update("contact.email", value)
                    }
                  />

                  <Field
                    label="Phone"
                    value={data.contact.phone}
                    onChange={(value) =>
                      update("contact.phone", value)
                    }
                  />

                  <Field
                    label="WhatsApp"
                    value={data.contact.whatsapp}
                    onChange={(value) =>
                      update("contact.whatsapp", value)
                    }
                  />

                  <Field
                    label="Business hours"
                    value={data.contact.hours}
                    onChange={(value) =>
                      update("contact.hours", value)
                    }
                  />
                </div>

                <Field
                  label="Address / location"
                  value={data.contact.address}
                  onChange={(value) =>
                    update("contact.address", value)
                  }
                />

                <Field
                  label="Google Maps URL"
                  value={data.contact.mapsUrl}
                  onChange={(value) =>
                    update("contact.mapsUrl", value)
                  }
                />
              </section>
            )}

            {tab === "branding" && (
              <section className="settings-panel">
                <div className="settings-panel-head">
                  <div>
                    <span>04 · BRAND</span>
                    <h2>Brand identity</h2>
                    <p>
                      Update brand labels and image URLs used by the website
                      shell.
                    </p>
                  </div>
                </div>

                <div className="settings-grid-two">
                  <Field
                    label="Brand name"
                    value={data.branding.brandName}
                    onChange={(value) =>
                      update("branding.brandName", value)
                    }
                  />

                  <Field
                    label="Studio name"
                    value={data.branding.studioName}
                    onChange={(value) =>
                      update("branding.studioName", value)
                    }
                  />

                  <Field
                    label="Logo URL"
                    value={data.branding.logoUrl}
                    onChange={(value) =>
                      update("branding.logoUrl", value)
                    }
                  />

                  <Field
                    label="Favicon URL"
                    value={data.branding.faviconUrl}
                    onChange={(value) =>
                      update("branding.faviconUrl", value)
                    }
                  />
                </div>

                <div className="settings-preview-note">
                  <Link2 size={15} />
                  <span>
                    Use an absolute URL or a public path such as{" "}
                    <code>/images/logo.svg</code>.
                  </span>
                </div>
              </section>
            )}

            {tab === "seo" && (
              <section className="settings-panel">
                <div className="settings-panel-head">
                  <div>
                    <span>05 · SEARCH</span>
                    <h2>Global SEO</h2>
                    <p>
                      Defaults used when a page does not provide its own
                      metadata.
                    </p>
                  </div>
                </div>

                <Field
                  label="Site title"
                  value={data.seo.title}
                  onChange={(value) =>
                    update("seo.title", value)
                  }
                />

                <Field
                  label="Meta description"
                  value={data.seo.description}
                  onChange={(value) =>
                    update("seo.description", value)
                  }
                  textarea
                />

                <Field
                  label="Keywords"
                  value={data.seo.keywords}
                  onChange={(value) =>
                    update("seo.keywords", value)
                  }
                />

                <div className="settings-grid-two">
                  <Field
                    label="OG image URL"
                    value={data.seo.ogImage}
                    onChange={(value) =>
                      update("seo.ogImage", value)
                    }
                  />

                  <Field
                    label="Canonical URL"
                    value={data.seo.canonicalUrl}
                    onChange={(value) =>
                      update("seo.canonicalUrl", value)
                    }
                  />

                  <Field
                    label="Google verification"
                    value={data.seo.googleVerification}
                    onChange={(value) =>
                      update("seo.googleVerification", value)
                    }
                  />
                </div>
              </section>
            )}
          </main>
        </div>

        <div className="settings-savebar">
          <span>
            {saved ? (
              <>
                <Check size={14} />
                All global changes saved
              </>
            ) : (
              "Changes are local until you save them."
            )}
          </span>

          <button
            className="admin-primary-button"
            onClick={save}
            disabled={saving}
            type="button"
          >
            <Save size={15} />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
