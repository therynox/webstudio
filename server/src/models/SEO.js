const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["global", "homepage", "project", "blog", "service"],
      required: true,
    },

    referenceId: {
      type: String,
      default: "",
      trim: true,
    },

    referenceSlug: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
      maxlength: 70,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 180,
    },

    keywords: {
      type: String,
      default: "",
      trim: true,
    },

    canonicalUrl: {
      type: String,
      default: "",
      trim: true,
    },

    ogTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 95,
    },

    ogDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },

    ogImage: {
      type: String,
      default: "",
      trim: true,
    },

    twitterTitle: {
      type: String,
      default: "",
      trim: true,
    },

    twitterDescription: {
      type: String,
      default: "",
      trim: true,
    },

    twitterImage: {
      type: String,
      default: "",
      trim: true,
    },

    robotsIndex: {
      type: Boolean,
      default: true,
    },

    robotsFollow: {
      type: Boolean,
      default: true,
    },

    schemaType: {
      type: String,
      default: "",
      trim: true,
    },

    schemaJson: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

seoSchema.index(
  { type: 1, referenceId: 1 },
  { unique: true }
);

module.exports = mongoose.model("SEO", seoSchema);
