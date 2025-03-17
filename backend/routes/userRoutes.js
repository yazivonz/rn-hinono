const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {isAuthenticatedUser} = require('../utils/auth')
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require("../controllers/userController");


router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get("/profile",isAuthenticatedUser, getUserProfile)
router.put("/profile", isAuthenticatedUser, upload.single("avatar"), updateUserProfile);
module.exports = router;