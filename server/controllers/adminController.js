const User = require("../models/userModel")
const City = require("../models/cityModel")

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    console.log("Admin getUsers called by:", req.user.id)
    const users = await User.find().select("-password")

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.error("Error in getUsers:", error)
    next(error)
  }
}

// @desc    Get single user
// @route   GET /api/admin/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Delete user's favorite cities
    await City.deleteMany({ user: req.params.id })

    // Delete user - updated to use deleteOne instead of remove
    await User.deleteOne({ _id: req.params.id })

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all cities
// @route   GET /api/admin/cities
// @access  Private/Admin
exports.getAllCities = async (req, res, next) => {
  try {
    console.log("Admin getAllCities called by:", req.user.id)
    const cities = await City.find().populate({
      path: "user",
      select: "name email",
    })

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
    })
  } catch (error) {
    console.error("Error in getAllCities:", error)
    next(error)
  }
}

// @desc    Delete city
// @route   DELETE /api/admin/cities/:id
// @access  Private/Admin
exports.deleteCity = async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id)

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      })
    }

    // Updated to use deleteOne instead of remove
    await City.deleteOne({ _id: req.params.id })

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
