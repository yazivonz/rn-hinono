const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    createProduct,
    getProductsAndCategories
} = require("../controllers/productController");

router.post("/create", upload.single("image"), createProduct);
router.get('/get-products-and-categories', getProductsAndCategories);

module.exports = router;