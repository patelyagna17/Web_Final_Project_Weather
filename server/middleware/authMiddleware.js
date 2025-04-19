const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

// Protect routes
exports.protect = async (req, res, next) => {
  let token

  console.log("Auth headers:", req.headers.authorization)
  console.log("Cookies:", req.cookies)

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1]
    console.log("Using token from Authorization header")
  } else if (req.cookies && req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token
    console.log("Using token from cookies")
  }

  // Make sure token exists
  if (!token) {
    console.log("No token found")
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("Token verified, user id:", decoded.id)

    req.user = await User.findById(decoded.id)

    if (!req.user) {
      console.log("User not found in database")
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    console.log("User authenticated:", req.user.name, "Role:", req.user.role)
    next()
  } catch (err) {
    console.error("Token verification error:", err.message)
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    })
  }
}

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      })
    }

    if (!roles.includes(req.user.role)) {
      console.log(`User role ${req.user.role} not authorized. Required roles:`, roles)
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      })
    }

    console.log(`User role ${req.user.role} authorized to access this route`)
    next()
  }
}
