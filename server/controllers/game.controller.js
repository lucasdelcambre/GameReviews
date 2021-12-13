const Game = require('../models/game.model');
const ReviewController = require('./review.controller');
const jwt = require('jsonwebtoken');

module.exports = {
    // Get all games
    getAllGames: (req, res) => {
        Game.find({})
            .populate("createdBy", "firstName lastName _id")
            .then((allGames) => res.json(allGames))
            .catch((err) => res.status(400).json(err))
    },

    // Get one game
    getOneGame: (req, res) => {
        Game.findById(req.params.id)
            .populate("createdBy", "firstName lastName _id")
            .then((oneGame) => res.json(oneGame))
            .catch((err) => res.status(400).json(err))
    },

    // Find all by user
    getAllByUser: (req, res) => {
        Game.find({createdBy: req.params.userId})
            .populate("createdBy", "firstName lastName _id")
            .then((allUserGames) => res.json(allUserGames))
            .catch((err) => res.status(400).json(err));
    },

    // Create new game
    createGame: (req, res) => {
        const newGameObj = new Game(req.body);

        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        });

        newGameObj.createdBy = decodedJWT.payload.id;
        newGameObj.avgRating = req.body.rating;

        newGameObj.save(req.body)
            .then((newGame) => res.json(newGame))
            .catch((err) => res.status(400).json(err));
    },

    // Update one game
    updateGame: (req, res) => {
        Game.findByIdAndUpdate(
            {_id: req.params.id},
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then((updatedGame) => res.json(updatedGame))
            .catch((err) => res.status(400).json(err))
    },

    // Delete one game
    deleteGame: (req, res) => {
        Game.deleteOne({_id: req.params.id})
        .then((deletedGame) => res.json(deletedGame))
        .catch((err) => res.status(400).json(err))
    }
}