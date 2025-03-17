const Review = require('../model/review');
const ErrorHandler = require('../utils/errorHandler');

// Create new review
exports.createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.create({
            rating,
            comment,
            product: req.params.productId,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get product reviews
exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name avatar');

        res.status(200).json({
            success: true,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update review
exports.updateReview = async (req, res) => {
    try {
        let review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                error: 'Review not found'
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: 'You can only update your own reviews'
            });
        }

        review = await Review.findByIdAndUpdate(
            req.params.reviewId,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).json({
                success: false,
                error: 'Review not found'
            });
        }

        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                error: 'You can only delete your own reviews'
            });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};