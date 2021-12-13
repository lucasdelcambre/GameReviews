const ReviewController = require('../controllers/review.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/reviews', ReviewController.getAllReviews);
    app.post('/api/reviews', authenticate, ReviewController.createReview);
    app.get('/api/reviews/:id', ReviewController.getOneReview);
    app.get('/api/reviews/user/:userId', ReviewController.getAllReviewsByUser);
    app.get('/api/reviews/game/:gameId', ReviewController.getAllReviewsForGame);
    app.get('/api/reviews/game/:gameId/rating', ReviewController.calcRating);
    app.put('/api/reviews/:id', authenticate, ReviewController.updateReview);
    app.delete('/api/reviews/:id', authenticate, ReviewController.deleteReview);
}