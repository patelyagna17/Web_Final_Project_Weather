const express = require("express")
const { getWeatherByCity, addFavoriteCity, removeFavoriteCity } = require("../controllers/weatherController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/:city", getWeatherByCity)
router.post("/favorites", protect, addFavoriteCity)
router.delete("/favorites/:id", protect, removeFavoriteCity)

module.exports = router
