const Review = require('../models/review.model')
const Game = require('../models/game.model');
const jwt = require('jsonwebtoken');

module.exports = {
    // Get all reviews
    getAllReviews: (req, res) => {
        Review.find({})
        .populate("createdBy", "firstName lastName _id")
        .then((allReviews) => res.json(allReviews))
        .catch((err) => console.log(err));
    },

    // Get one Review
    getOneReview: (req, res) => {
        Review.find(req.params.id)
            .populate('createdBy', 'firstName lastName _id')
            .then((oneReview) => res.json(oneReview))
            .catch((err) => console.log(err));
    },

    // Get all reviews by user
    getAllReviewsByUser: (req, res) => {
        Review.find({createdBy: req.params.userId})
            .populate('createdBy', 'firstName lastName _id')
            .then((allUserReviews) => res.json(allUserReviews))
            .catch((err) => console.log(err));
    },

    // Get all reviews for game
    getAllReviewsForGame: (req, res) => {
        Review.find({game: req.params.gameId})
            .populate('createdBy', 'firstName lastName _id')
            .then((allReviewsForGame) => res.json(allReviewsForGame))
            .catch((err) => console.log(err));
    },

    // Create new review
    createReview: (req, res) => {
        const newReviewObj = new Review(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        });

        newReviewObj.createdBy = decodedJWT.payload.id;

        newReviewObj.save(req.body)
            .then((newReview) => res.json(newReview))
            .catch((err) => res.status(400).json(err));
    },

    // Update one review
    updateReview: (req, res) => {
        Review.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then((updatedReview) => res.json(updatedReview))
            .catch((err) => res.status(400).json(err))
    },

    // Delete one review
    deleteReview: (req, res) => {
        Review.deleteOne({_id: req.params.id})
        .then((deletedReview) => res.json(deletedReview))
        .catch((err) => res.status(400).json(err))
    },

    // Calculate rating for game
    calcRating: (req, res) => {
        Review.find({game: req.params.gameId})
            .then((allReviewsForGame) => {
                let newRating = 0;
                for(let i = 0; i < allReviewsForGame.length; i++){
                    newRating += allReviewsForGame[i].rating;
                }
                newRating = newRating / allReviewsForGame.length;
                Game.findByIdAndUpdate(
                    {_id: req.params.gameId},
                    {avgRating: newRating.toFixed(1)},
                    {new: true})
                    .then()
                    .catch((err) => console.log(err));
                res.json(allReviewsForGame);
            })
            .catch((err) => console.log(err));
    }
}