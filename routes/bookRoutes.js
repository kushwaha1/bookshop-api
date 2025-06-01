const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReviews,
  addOrModifyReview,
  deleteReview,
} = require('../controller/bookController.js');
const auth = require('../middleware/auth');

// Public routes
router.get('/books', getAllBooks); // Task 1 & 10
router.get('/books/isbn/:isbn', getBookByISBN); // Task 2 & 11
router.get('/books/author/:author', getBooksByAuthor); // Task 3 & 12
router.get('/books/title/:title', getBooksByTitle); // Task 4 & 13
router.get('/books/reviews/:isbn', getBookReviews); // Task 5

// Protected routes
router.post('/reviews', auth, addOrModifyReview); // Task 8
router.delete('/reviews/:reviewId', auth, deleteReview); // Task 9

module.exports = router;