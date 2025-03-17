// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/auth");
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

// Review routes
router.post("/:productId", isAuthenticatedUser, createReview);
router.get("/product/:productId", getProductReviews);
router.put("/:reviewId", isAuthenticatedUser, updateReview);
router.delete("/:reviewId", isAuthenticatedUser, deleteReview);

module.exports = router;