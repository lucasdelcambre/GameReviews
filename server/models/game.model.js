const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, 'Game title is required.'],
            minlength: [3, 'Game title must be at least 3 characters.']
        },

        description: {
            type: String,
            minlength: [3, 'Game descripion must be at least 3 characters.']
        },

        avgRating: {
            type: Number,
            min: [0, "Rating can't be below 0."],
            max: [10, "Rating can't be above 10."]
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
);

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;