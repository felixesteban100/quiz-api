import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: [true, 'Please provide userId'],
        unique: true
    },
    username: {
        type: String,
        require: [true, 'Please provide username'],
    },
    fullName: String,
    imageUrl: String,
    lastSignInAt: Date,
    updatedAt: Date,
    createdAt: Date,
})

module.exports = mongoose.model('User', UserSchema)