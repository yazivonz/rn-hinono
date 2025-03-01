const Product = require("../model/product");
const Category = require("../model/category");
const { cloudinary, secretKey } = require('../config/cloudinaryConfig')

exports.createProduct = async (req, res) => {
    try {
        const result = await cloudinary.v2.uploader.upload(
            req.file.path,
            {
                folder: "avatars",
                width: 200,
                crop: "scale",
            },
            (err, res) => {
                console.log(err, res);
            }
        );

        const { name, description, quantity, category, price } = req.body;
        const product = await Product.create({
            name,
            price,
            category,
            description,
            quantity,
            images: {
                public_id: result.public_id,
                url: result.url,
            },
        });

        // console.log('this is backend product Create', product)

        res.status(200).send({
            success: true,
            message: "Create Product Successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Post API",
            error,
        });
    }
}

exports.getProductsAndCategories = async (req, res) => {
    try {
        const products = await Product.find()
        const categories = await Category.find()
        // console.log(product)
        res.status(201).json({ message: "Products and Categories fetch successfully", products, categories });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Products and Categories Get API",
            error,
        });
    }
}