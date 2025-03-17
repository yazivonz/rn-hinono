const Order = require('../model/order');
const ErrorHandler = require('../utils/errorHandler');

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const { orderItems, deliveryAddress, totalAmount } = req.body;
        
        const order = await Order.create({
            orderItems,
            deliveryAddress,
            totalAmount,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get logged in user orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('orderItems.product');

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('orderItems.product');

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        order.status = req.body.status;
        await order.save();

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};