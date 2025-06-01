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
  getAllBooksAsync,
  getAllBooksCallback,
  getBookByISBNAsync,
  getBookByISBNCallback,
  getBooksByAuthorAsync,
  getBooksByAuthorCallback,
  getBooksByTitleAsync,
  getBooksByTitleCallback
} = require('../controller/bookController.js');
const auth = require('../middleware/auth');

// Public routes
router.get('/books', getAllBooks); // Task 1
router.get('/books/isbn/:isbn', getBookByISBN); // Task 2
router.get('/books/author/:author', getBooksByAuthor); // Task 3
router.get('/books/title/:title', getBooksByTitle); // Task 4
router.get('/books/reviews/:isbn', getBookReviews); // Task 5

// Protected routes
router.post('/reviews', auth, addOrModifyReview); // Task 8
router.delete('/reviews/:reviewId', auth, deleteReview); // Task 9

// async/await and callback
router.get('/booksAsync', getAllBooksAsync); // Task 10
router.get('/booksCallback', getAllBooksCallback);  // Task 10
router.get('/booksAsync/isbn/:isbn', getBookByISBNAsync); // Task 11
router.get('/booksCallback/isbn/:isbn', getBookByISBNCallback); // Task 11
router.get('/booksAsync/author/:author', getBooksByAuthorAsync); // Task 12
router.get('/booksCallback/author/:author', getBooksByAuthorCallback); // Task 12
router.get('/booksAsync/title/:title', getBooksByTitleAsync); // Task 13
router.get('/booksCallback/title/:title', getBooksByTitleCallback); // Task 13

module.exports = router;