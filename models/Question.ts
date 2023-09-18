import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
    {
        answerSelected: {
            type: String,
            default: '',
            required: false
        },
        category: {
            type: String,
            required: [true, 'Please provide a category']
        },
        type: {
            type: String,
            enum: ['multiple', 'boolean'],
            required: [true, 'Please provide a type']
        },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: [true, 'Please provide a difficulty']
        },
        question: {
            type: String,
            required: [true, 'Please provide a question'],
            unique: true
        },
        correct_answer: {
            type: String,
            required: [true, 'Please provide a correct answer']
        },
        incorrect_answers: {
            type: Array,
            required: [true, 'Please provide incorrect answers'],
            validate: [arrayLimit, 'Cannot have more than 3 incorrect answers']
        },
        img: {
            type: String,
            default: '',
            required: false
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user']
        }
    },
    { timestamps: true }
)

function arrayLimit(val: Array<string>) {
    return val.length <= 3;
  }

module.exports = mongoose.model("Question", QuestionSchema)