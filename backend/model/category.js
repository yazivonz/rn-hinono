const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter category name"],
            maxLength: [60, "Your name cannot exceed 30 characters"],
        },
        description: {
            type: String,
            required: [true, "Please enter category dess=cription"],
            maxLength: [60, "Your name cannot exceed 30 characters"],
        },
        image: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                },
            }
        ]
    },
    { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);