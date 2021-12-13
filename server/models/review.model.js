const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, "Review is required."]
        },

        rating: {
            type: Number,
            required: [true, "Rating is required."],
            min: [0, "Rating can't be below 0."],
            max: [10, "Rating can't be above 10."]
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        game: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }
    },
    {timestamps: true}
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;