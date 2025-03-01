const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const {
    createCategory
} = require("../controllers/categoryController");

router.post("/create", upload.single("image"), createCategory);

module.exports = router;