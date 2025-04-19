const mongoose = require("mongoose")
const User = require("./models/userModel")
require("dotenv").config()

const makeUserAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected")

    // Find user by email
    const user = await User.findOne({ email })

    if (!user) {
      console.log(`User with email ${email} not found`)
      process.exit(1)
    }

    // Update user role to admin
    user.role = "admin"
    await user.save()

    console.log(`User ${user.name} (${user.email}) is now an admin`)
    process.exit(0)
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

// Get email from command line argument
const email = process.argv[2]

if (!email) {
  console.log("Please provide an email address")
  console.log("Usage: node makeAdmin.js user@example.com")
  process.exit(1)
}

makeUserAdmin(email)
