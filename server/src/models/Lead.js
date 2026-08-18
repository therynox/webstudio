const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, default: "", trim: true },
    company: { type: String, default: "", trim: true },
    service: { type: String, default: "", trim: true },
    customerType: { type: String, default: "New Project", trim: true },
    budget: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    websiteUrl: { type: String, default: "", trim: true },
    projectGoal: { type: String, default: "", trim: true },
    pages: { type: String, default: "", trim: true },
    reference: { type: String, default: "", trim: true },
    source: { type: String, default: "Website Contact Form", trim: true },
    plan: { type: String, default: "", trim: true },
    addons: { type: String, default: "", trim: true },
    services: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "won", "lost"],
      default: "new",
      index: true,
    },
    notes: { type: String, default: "", trim: true },
    lastContactedAt: { type: Date, default: null },
    nextFollowUpAt: { type: Date, default: null },
    convertedProjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },
    convertedAt: { type: Date, default: null },
    activities: [
      {
        type: {
          type: String,
          enum: ["created", "status_changed", "note", "follow_up", "email", "call", "whatsapp"],
          required: true,
        },
        message: { type: String, default: "", trim: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

leadSchema.index({ createdAt: -1 });
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
