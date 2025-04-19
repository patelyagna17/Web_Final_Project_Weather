const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const weatherRoutes = require("./routes/weatherRoutes")
const adminRoutes = require("./routes/adminRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")
require("dotenv").config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 3080

// CORS configuration - updated to allow all origins in development
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : ["http://localhost:3000", "http://localhost:3080"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  if (req.method === "POST" || req.method === "PUT") {
    console.log("Request body:", req.body)
  }
  next()
})

// Routes
app.use("/api/users", userRoutes)
app.use("/api/weather", weatherRoutes)
app.use("/api/admin", adminRoutes)

// Test route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working on port " + PORT })
})

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}

// Error handling middleware
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Server URL: http://localhost:${PORT}`)
})
