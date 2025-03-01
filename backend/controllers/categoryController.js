const Category = require("../model/category");
const { cloudinary, secretKey } = require('../config/cloudinaryConfig')

exports.createCategory = async (req, res, next) => {
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

    const { name, description } = req.body;

    const category = await Category.create({
        name,
        description,
        image: {
            public_id: result.public_id,
            url: result.url,
        },
    });

    if (!category) {
        return res.status(500).json({
            success: false,
            message: "Failed to create an account",
        });
    }

    res.status(200).send({
        success: true,
        message: "Create Post Successfully",
        post
    });
};