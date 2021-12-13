const GameController = require('../controllers/game.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/games', GameController.getAllGames);
    app.post('/api/games', authenticate, GameController.createGame);
    app.get('/api/games/:id', GameController.getOneGame);
    app.get('/api/games/user/:userId', GameController.getAllByUser);
    //app.get('/api/games/:id/rating', GameController.updateAvgRating);
    app.put('/api/games/:id', authenticate, GameController.updateGame);
    app.delete('/api/games/:id', authenticate, GameController.deleteGame);
}