const express = require("express")
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllCities,
  deleteCity,
} = require("../controllers/adminController")
const { protect, authorize } = require("../middleware/authMiddleware")

const router = express.Router()

// Protect all routes
router.use(protect)
router.use(authorize("admin"))

router.get("/users", getUsers)
router.get("/users/:id", getUser)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)
router.get("/cities", getAllCities)
router.delete("/cities/:id", deleteCity)

module.exports = router
