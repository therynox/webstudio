const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: "", trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "", trim: true },

    category: { type: String, default: "Insights", trim: true },
    tags: { type: [String], default: [] },

    author: { type: String, default: "THERYNOX Web Studio", trim: true },
    readTime: { type: Number, default: 5, min: 1 },
    featured: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["draft", "scheduled", "published"],
      default: "draft",
    },

    publishedAt: { type: Date, default: null },

    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: [String], default: [] },
    },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.index({ status: 1, featured: -1, publishedAt: -1 });
blogSchema.index({ category: 1 });

module.exports = mongoose.model("Blog", blogSchema);
