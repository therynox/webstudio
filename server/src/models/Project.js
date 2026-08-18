const mongoose = require("mongoose");

// =====================================================
// PROJECT IMAGE
// =====================================================

const projectImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    caption: {
      type: String,
      default: "",
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

// =====================================================
// PROJECT
// =====================================================

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      default: "",
      trim: true,
    },

    client: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    challenge: {
      type: String,
      default: "",
    },

    solution: {
      type: String,
      default: "",
    },

    result: {
      type: String,
      default: "",
    },

    coverImage: {
      type: String,
      default: "",
      trim: true,
    },

    video: {
      type: String,
      default: "",
      trim: true,
    },

    images: {
      type: [projectImageSchema],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    services: {
      type: [String],
      default: [],
    },

    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["draft", "in-progress", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);