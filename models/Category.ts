import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Please provide a category name']
        },
        id: {
            type: Number,
            unique: true,
            required: [true, 'Please provide an id for the category']
        },
        createdBy: {
            type: String,
            ref: 'User',
            required: [true, 'Please provide userId']
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Category", CategorySchema)