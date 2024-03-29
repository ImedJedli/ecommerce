const mongoose = require("mongoose");

const blogSchema = new mongoose.mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter blog title"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter blog description"],
    trim: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  images: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.mongoose.model("Blog", blogSchema);
