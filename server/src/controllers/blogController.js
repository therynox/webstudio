const Blog = require("../models/Blog");

const normalizeSlug = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return [...new Set(value.map((item) => String(item).trim().replace(/^#/, "")).filter(Boolean))];
  }

  return [...new Set(String(value || "")
    .split(",")
    .map((item) => item.trim().replace(/^#/, ""))
    .filter(Boolean))];
};

const normalizeDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const prepareBlogData = (body) => {
  const status = ["draft", "scheduled", "published"].includes(body.status)
    ? body.status
    : "draft";

  const publishedAt = normalizeDate(body.publishedAt);
  const data = {
    title: String(body.title || "").trim(),
    slug: normalizeSlug(body.slug || body.title),
    excerpt: String(body.excerpt || "").trim(),
    content: String(body.content || "").trim(),
    coverImage: String(body.coverImage || "").trim(),
    category: String(body.category || "Insights").trim() || "Insights",
    tags: normalizeTags(body.tags),
    author: String(body.author || "THERYNOX Web Studio").trim() || "THERYNOX Web Studio",
    readTime: Math.max(1, Number(body.readTime) || 5),
    featured: Boolean(body.featured),
    status,
    publishedAt: status === "published"
      ? (publishedAt || new Date())
      : status === "scheduled"
        ? publishedAt
        : null,
    seo: {
      title: String(body.seo?.title || "").trim(),
      description: String(body.seo?.description || "").trim(),
      keywords: normalizeTags(body.seo?.keywords),
    },
  };

  return data;
};

const validatePublishing = (data) => {
  if (data.status === "scheduled" && !data.publishedAt) {
    return "Choose a publish date and time for a scheduled article.";
  }

  if (data.status === "scheduled" && data.publishedAt <= new Date()) {
    return "Scheduled publish time must be in the future.";
  }

  return null;
};

const clearOtherFeatured = async (blogId) => {
  await Blog.updateMany({ _id: { $ne: blogId }, featured: true }, { $set: { featured: false } });
};

// GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const { category, search, featured, tag } = req.query;
    const now = new Date();
    const filter = {
      $or: [
        { status: "published", $or: [{ publishedAt: null }, { publishedAt: { $lte: now } }] },
        { status: "scheduled", publishedAt: { $lte: now } },
      ],
    };

    if (category && category !== "ALL") filter.category = category;
    if (featured === "true") filter.featured = true;
    if (tag) filter.tags = tag;

    if (search) {
      filter.$and = [
        { $or: [
          { title: { $regex: search, $options: "i" } },
          { excerpt: { $regex: search, $options: "i" } },
          { tags: { $regex: search, $options: "i" } },
        ] },
      ];
    }

    const blogs = await Blog.find(filter)
      .select("-content")
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .lean();

    res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error("GET PUBLIC BLOGS ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blog posts" });
  }
};

// GET /api/blogs/:slug
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      $or: [
        { status: "published", $or: [{ publishedAt: null }, { publishedAt: { $lte: new Date() } }] },
        { status: "scheduled", publishedAt: { $lte: new Date() } },
      ],
    }).lean();

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    await Blog.updateOne({ _id: blog._id }, { $inc: { views: 1 } });
    blog.views = (blog.views || 0) + 1;

    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("GET PUBLIC BLOG ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blog post" });
  }
};

// GET /api/blogs/admin/all
exports.getAdminBlogs = async (req, res) => {
  try {
    const { category, status, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (category && category !== "ALL") filter.category = category;
    if (status && status !== "ALL") filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
    const safePage = Math.max(1, Number(page) || 1);
    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ featured: -1, updatedAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit)
        .lean(),
      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: blogs.length,
      total,
      page: safePage,
      pages: Math.max(1, Math.ceil(total / safeLimit)),
      data: blogs,
    });
  } catch (error) {
    console.error("GET ADMIN BLOGS ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to fetch admin blogs" });
  }
};

// GET /api/blogs/admin/meta
exports.getAdminMeta = async (req, res) => {
  try {
    const [categories, tags, totals] = await Promise.all([
      Blog.distinct("category"),
      Blog.distinct("tags"),
      Blog.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const counts = totals.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {});

    res.json({
      success: true,
      data: {
        categories: categories.filter(Boolean).sort(),
        tags: tags.filter(Boolean).sort(),
        counts: {
          total: Object.values(counts).reduce((sum, value) => sum + value, 0),
          published: counts.published || 0,
          scheduled: counts.scheduled || 0,
          draft: counts.draft || 0,
        },
      },
    });
  } catch (error) {
    console.error("GET BLOG META ERROR:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blog metadata" });
  }
};

// GET /api/blogs/admin/:id
exports.getAdminBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) return res.status(404).json({ success: false, message: "Blog post not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid blog ID" });
  }
};

// POST /api/blogs/admin
exports.createBlog = async (req, res) => {
  try {
    const data = prepareBlogData(req.body);
    if (!data.title || !data.content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const publishError = validatePublishing(data);
    if (publishError) return res.status(400).json({ success: false, message: publishError });

    const blog = await Blog.create(data);
    if (blog.featured) await clearOtherFeatured(blog._id);

    res.status(201).json({ success: true, message: "Blog post created successfully", data: blog });
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.code === 11000 ? "A blog with this slug already exists." : error.message,
    });
  }
};

// PUT /api/blogs/admin/:id
exports.updateBlog = async (req, res) => {
  try {
    const data = prepareBlogData(req.body);
    if (!data.title || !data.content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const publishError = validatePublishing(data);
    if (publishError) return res.status(400).json({ success: false, message: publishError });

    const blog = await Blog.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: "Blog post not found" });
    if (blog.featured) await clearOtherFeatured(blog._id);

    res.json({ success: true, message: "Blog post updated successfully", data: blog });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);
    res.status(400).json({
      success: false,
      message: error.code === 11000 ? "A blog with this slug already exists." : error.message,
    });
  }
};

// DELETE /api/blogs/admin/:id
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog post not found" });
    res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid blog ID" });
  }
};
