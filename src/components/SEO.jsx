import React, { useEffect } from "react";
import api from "../services/api";

const FALLBACK = {
  title: "THERYNOX Web Studio | Digital Experiences",
  description:
    "THERYNOX builds premium websites, e-commerce platforms and digital systems for ambitious businesses.",
  keywords: "",
  canonicalUrl: "",
  ogImage: "",
  robotsIndex: true,
  robotsFollow: true,
};

function setMeta(name, content, attribute = "name") {
  if (!content) return;

  let element = document.head.querySelector(
    `meta[${attribute}="${name}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function SEO({
  type = "global",
  reference = "",
  fallback = {},
}) {
  useEffect(() => {
    let mounted = true;
    let previousTitle = document.title;

    const apply = (data) => {
      if (!mounted) return;

      const seo = {
        ...FALLBACK,
        ...fallback,
        ...(data || {}),
      };

      document.title = seo.title;

      setMeta("description", seo.description);
      setMeta("keywords", seo.keywords);

      setMeta(
        "robots",
        `${seo.robotsIndex ? "index" : "noindex"}, ${seo.robotsFollow ? "follow" : "nofollow"}`
      );

      if (seo.canonicalUrl) {
        let canonical = document.head.querySelector(
          'link[rel="canonical"]'
        );

        if (!canonical) {
          canonical = document.createElement("link");
          canonical.rel = "canonical";
          document.head.appendChild(canonical);
        }

        canonical.href = seo.canonicalUrl;
      }

      setMeta("og:title", seo.ogTitle || seo.title, "property");
      setMeta(
        "og:description",
        seo.ogDescription || seo.description,
        "property"
      );
      setMeta(
        "og:type",
        type === "blog" ? "article" : "website",
        "property"
      );

      if (seo.canonicalUrl) {
        setMeta("og:url", seo.canonicalUrl, "property");
      }

      if (seo.ogImage) {
        setMeta("og:image", seo.ogImage, "property");
      }

      setMeta(
        "twitter:card",
        seo.twitterImage || seo.ogImage
          ? "summary_large_image"
          : "summary"
      );
      setMeta(
        "twitter:title",
        seo.twitterTitle || seo.ogTitle || seo.title
      );
      setMeta(
        "twitter:description",
        seo.twitterDescription ||
          seo.ogDescription ||
          seo.description
      );

      if (seo.twitterImage || seo.ogImage) {
        setMeta(
          "twitter:image",
          seo.twitterImage || seo.ogImage
        );
      }

      const existingSchema =
        document.head.querySelector(
          'script[data-therynox-seo-schema="true"]'
        );

      if (existingSchema) {
        existingSchema.remove();
      }

      if (seo.schemaJson) {
        try {
          const schema = JSON.parse(seo.schemaJson);
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.dataset.therynoxSeoSchema = "true";
          script.textContent = JSON.stringify(schema);
          document.head.appendChild(script);
        } catch (error) {
          console.warn("Invalid SEO JSON-LD:", error);
        }
      }
    };

    api
      .get(
        `/seo/public/${type}/${encodeURIComponent(
          reference || "home"
        )}`
      )
      .then((response) => {
        apply(response.data?.data || null);
      })
      .catch(() => {
        apply(null);
      });

    return () => {
      mounted = false;
      document.title = previousTitle;
    };
  }, [type, reference]);

  return null;
}
