import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { getMediaUrl } from "../utils/media";
import SEO from "../components/SEO";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/blogs/${slug}`)
      .then((response) => setPost(response.data?.data || null))
      .catch((err) => setError(err.response?.data?.message || "Article not found."));
  }, [slug]);

  if (error) {
    return (
      <div className="blog-detail-page">
        <Navbar />
        <main className="blog-detail-empty">
          <span>404 / ARTICLE</span>
          <h1>{error}</h1>
          <Link to="/blog">Back to insights <ArrowUpRight size={15} /></Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <div className="blog-detail-page"><Navbar /><div className="blog-loading">Loading article...</div><Footer /></div>;
  }

  return (
    <div className="blog-detail-page">
      <Navbar />

      <SEO type="blog" reference={post._id || slug} />
      <main>
        <section className="blog-detail-header">
          <div className="blog-detail-header-inner">
            <Link to="/blog" className="blog-back"><ArrowLeft size={14} /> All insights</Link>
            <div className="blog-detail-kicker"><span>{post.category}</span><span>{post.readTime || 5} min read</span></div>
            <h1>{post.title}</h1>
            <p className="blog-detail-excerpt">{post.excerpt}</p>
            <div className="blog-detail-byline">
              <span>{post.author || "THERYNOX Web Studio"}</span>
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" }) : ""}</span>
            </div>
          </div>
        </section>

        {post.coverImage && (
          <div className="blog-detail-cover">
            <img src={getMediaUrl(post.coverImage)} alt={post.title} />
          </div>
        )}

        <article className="blog-article">
          <div className="blog-article-body">
            {String(post.content || "").split(/\n{2,}/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <aside className="blog-article-aside">
            <div><span>ARTICLE</span><strong>THERYNOX / {post.category}</strong></div>
            <div><Clock3 size={15} /><span>{post.readTime || 5} minute read</span></div>
            {(post.tags || []).length > 0 && (
              <div className="blog-tag-list">{post.tags.map(tag => <span key={tag}>#{tag}</span>)}</div>
            )}
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
}
