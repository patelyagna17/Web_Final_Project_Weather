const express = require("express")
const {
  registerUser,
  loginUser,
  logout,
  getMe,
  updateProfile,
  getFavoriteCities,
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

// Public routes - these should NOT have the protect middleware
router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logout)

// Protected routes - these should have the protect middleware
router.get("/me", protect, getMe)
router.put("/profile", protect, updateProfile)
router.get("/cities", protect, getFavoriteCities)

module.exports = router
