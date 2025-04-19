const User = require("../models/userModel")
const City = require("../models/cityModel")

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  try {
    console.log("Registration attempt with data:", req.body)
    const { name, email, password } = req.body


    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      console.log("User already exists with email:", email)
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
    }

    // Create user
    console.log("Creating new user with name:", name, "and email:", email)
    const user = await User.create({
      name,
      email,
      password,
    })

    console.log("User created successfully:", user._id)
    sendTokenResponse(user, 201, res)
  } catch (error) {
    console.error("Error in registerUser:", error.message)
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email and password",
      })
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    sendTokenResponse(user, 200, res)
  } catch (error) {
    next(error)
  }
}

// @desc    Log user out / clear cookie
// @route   GET /api/users/logout
// @access  Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    data: {},
  })
}

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user's favorite cities
// @route   GET /api/users/cities
// @access  Private
exports.getFavoriteCities = async (req, res, next) => {
  try {
    const cities = await City.find({ user: req.user.id })

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
    })
  } catch (error) {
    next(error)
  }
}

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === "production") {
    options.secure = true
  }

  console.log("Sending token response with token:", token ? "Token generated" : "No token")

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
}
