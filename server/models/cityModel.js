const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a city name"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Please add a country"],
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("City", citySchema)
