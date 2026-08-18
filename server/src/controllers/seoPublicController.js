const Blog = require("../models/Blog");
const Project = require("../models/Project");

const SITE_URL = (
  process.env.SITE_URL || "https://therynox.com"
).replace(/\/+$/, "");

function isPublished(blog) {
  const status = String(blog.status || "").toLowerCase();

  return (
    status === "published" ||
    status === "publish" ||
    blog.published === true ||
    blog.isPublished === true
  );
}

async function sitemap(req, res) {
  try {
    const [blogs, projects] = await Promise.all([
      Blog.find({}).select("slug status published isPublished updatedAt").lean(),
      Project.find({}).select("slug updatedAt").lean(),
    ]);

    const urls = [];

    // Homepage
    urls.push({
      loc: `${SITE_URL}/`,
      priority: "1.0",
      changefreq: "weekly",
    });

    // Blog listing
    urls.push({
      loc: `${SITE_URL}/blog`,
      priority: "0.9",
      changefreq: "weekly",
    });

    // Projects
    projects
      .filter((project) => project.slug)
      .forEach((project) => {
        urls.push({
          loc: `${SITE_URL}/work/${project.slug}`,
          lastmod: project.updatedAt,
          priority: "0.8",
          changefreq: "monthly",
        });
      });

    // Published blogs only
    blogs
      .filter((blog) => blog.slug && isPublished(blog))
      .forEach((blog) => {
        urls.push({
          loc: `${SITE_URL}/blog/${blog.slug}`,
          lastmod: blog.updatedAt,
          priority: "0.8",
          changefreq: "monthly",
        });
      });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${
      url.lastmod
        ? `<lastmod>${new Date(url.lastmod).toISOString()}</lastmod>`
        : ""
    }
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res
      .status(200)
      .type("application/xml")
      .send(xml);
  } catch (error) {
    console.error("SITEMAP ERROR:", error);

    res.status(500).type("text/plain").send(
      "Unable to generate sitemap."
    );
  }
}

function robots(req, res) {
  const content = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /login

Sitemap: ${SITE_URL}/sitemap.xml
`;

  res
    .status(200)
    .type("text/plain")
    .send(content);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

module.exports = {
  sitemap,
  robots,
};