const axios = require("axios")
const City = require("../models/cityModel")

// @desc    Get weather forecast by city name
// @route   GET /api/weather/:city
// @access  Public
exports.getWeatherByCity = async (req, res, next) => {
  try {
    const { city } = req.params

    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=6b4ff959a94aeb6fcd7a9b485c6bf6b9`,
    )

    res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      })
    }
    next(error)
  }
}

// @desc    Add city to favorites
// @route   POST /api/weather/favorites
// @access  Private
exports.addFavoriteCity = async (req, res, next) => {
  try {
    req.body.user = req.user.id

    // Check if city already exists for this user
    const existingCity = await City.findOne({
      name: req.body.name,
      user: req.user.id,
    })

    if (existingCity) {
      return res.status(400).json({
        success: false,
        message: "City already in favorites",
      })
    }

    const city = await City.create(req.body)

    res.status(201).json({
      success: true,
      data: city,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Remove city from favorites
// @route   DELETE /api/weather/favorites/:id
// @access  Private
exports.removeFavoriteCity = async (req, res, next) => {
  try {
    console.log("Removing city with ID:", req.params.id)
    console.log("User ID:", req.user.id)

    const city = await City.findById(req.params.id)

    if (!city) {
      console.log("City not found")
      return res.status(404).json({
        success: false,
        message: "City not found",
      })
    }

    // Make sure user owns the city
    if (city.user.toString() !== req.user.id && req.user.role !== "admin") {
      console.log("Not authorized to delete this city")
      console.log("City user:", city.user.toString())
      console.log("Request user:", req.user.id)
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this city",
      })
    }

    // Use deleteOne instead of remove (which is deprecated)
    await City.deleteOne({ _id: req.params.id })
    console.log("City deleted successfully")

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    console.error("Error removing city:", error)
    next(error)
  }
}
