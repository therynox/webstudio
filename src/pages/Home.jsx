import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Technology from "../components/Technology";
import HomeProjects from "../components/HomeProjects";
import Process from "../components/Process";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import HomeCTA from "../components/HomeCTA";
import api from "../services/api";
import SEO from "../components/SEO";

const defaults = {
  hero: { enabled: true },
  stats: { enabled: true },
  technology: { enabled: true },
  work: { enabled: true },
  process: { enabled: true },
  pricing: { enabled: true },
  contact: { enabled: true },
  seo: {},
};

export default function Home() {
  const [settings, setSettings] = useState(defaults);

  useEffect(() => {
    let mounted = true;
    api.get("/homepage")
      .then((response) => {
        if (mounted && response.data?.data) setSettings(response.data.data);
      })
      .catch((error) => console.error("HOMEPAGE SETTINGS ERROR:", error));

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const seo = settings.seo || {};
    if (seo.title) document.title = seo.title;
    if (seo.description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = seo.description;
    }
  }, [settings.seo]);

  const sectionMap = {
    hero: <section id="top"><Hero settings={settings.hero} /></section>,
    stats: <section id="stats"><Stats settings={settings.stats} /></section>,
    technology: <section id="technology"><Technology /></section>,
    work: <section id="work"><HomeProjects /></section>,
    process: <section id="process"><Process /></section>,
    pricing: <section id="pricing"><Pricing /></section>,
    contact: <section id="contact"><HomeCTA settings={settings.contact} /></section>,
  };

  const defaultSections = [
    { key: "hero", visible: settings.hero?.enabled !== false, order: 1 },
    { key: "stats", visible: settings.stats?.enabled !== false, order: 2 },
    { key: "technology", visible: settings.technology?.enabled !== false, order: 3 },
    { key: "work", visible: settings.work?.enabled !== false, order: 4 },
    { key: "process", visible: settings.process?.enabled !== false, order: 5 },
    { key: "pricing", visible: settings.pricing?.enabled !== false, order: 6 },
    { key: "contact", visible: settings.contact?.enabled !== false, order: 7 },
  ];

  const sections = (Array.isArray(settings.sections) && settings.sections.length ? settings.sections : defaultSections)
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      <SEO type="homepage" />
      <Navbar />
      <main>
        {sections.map((section) => {
          if (section.visible === false || !sectionMap[section.key]) return null;
          return <React.Fragment key={section.key}>{sectionMap[section.key]}</React.Fragment>;
        })}
      </main>
      <Footer />
    </>
  );
}
