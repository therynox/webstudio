import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { getMediaUrl } from "../utils/media";

const fallbackCategories = ["All", "Web Design", "Development", "E-commerce", "SEO", "Business"];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get("/blogs")
      .then((response) => {
        if (active) setPosts(response.data?.data || []);
      })
      .catch(() => {
        if (active) setPosts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const categories = useMemo(() => {
    const dynamic = posts.map((post) => post.category).filter(Boolean);
    return [...new Set([...fallbackCategories, ...dynamic])];
  }, [posts]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const haystack = `${post.title} ${post.excerpt} ${(post.tags || []).join(" ")}`.toLowerCase();
      return matchesCategory && (!term || haystack.includes(term));
    });
  }, [posts, category, search]);

  const featured = filtered.find((post) => post.featured) || filtered[0];

  return (
    <div className="blog-page">
      <Navbar />

      <main>
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <div>
              <div className="blog-eyebrow"><span /> THERYNOX INSIGHTS</div>
              <h1>Ideas that move<br /><em>digital businesses.</em></h1>
              <p>Practical thinking on web design, development, e-commerce, business systems and growth.</p>
            </div>
            <div className="blog-hero-meta">
              <span>01</span>
              <span>Knowledge / Journal</span>
            </div>
          </div>
        </section>

        <section className="blog-content">
          <div className="blog-toolbar">
            <div className="blog-categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="blog-search">
              <Search size={15} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles" />
            </label>
          </div>

          {loading ? (
            <div className="blog-loading">Loading insights...</div>
          ) : !filtered.length ? (
            <div className="blog-empty">
              <span>NO ARTICLES</span>
              <h2>Nothing here yet.</h2>
              <p>Publish your first article from the THERYNOX CMS.</p>
            </div>
          ) : (
            <>
              {featured && (
                <Link to={`/blog/${featured.slug}`} className="blog-featured">
                  <div className="blog-featured-media">
                    {featured.coverImage ? (
                      <img src={getMediaUrl(featured.coverImage)} alt={featured.title} />
                    ) : <div className="blog-image-placeholder" />}
                  </div>
                  <div className="blog-featured-copy">
                    <div className="blog-post-meta">
                      <span>{featured.category}</span>
                      <span>{featured.readTime || 5} min read</span>
                    </div>
                    <h2>{featured.title}</h2>
                    <p>{featured.excerpt}</p>
                    <span className="blog-read-link">Read article <ArrowUpRight size={15} /></span>
                  </div>
                </Link>
              )}

              <div className="blog-grid">
                {filtered.filter((post) => post._id !== featured?._id).map((post) => (
                  <article key={post._id} className="blog-card">
                    <Link to={`/blog/${post.slug}`} className="blog-card-media">
                      {post.coverImage ? <img src={getMediaUrl(post.coverImage)} alt={post.title} /> : <div className="blog-image-placeholder" />}
                      <span className="blog-card-arrow"><ArrowUpRight size={16} /></span>
                    </Link>
                    <div className="blog-card-copy">
                      <div className="blog-post-meta"><span>{post.category}</span><span>{post.readTime || 5} min read</span></div>
                      <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
                      <p>{post.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
