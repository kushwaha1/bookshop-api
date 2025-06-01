const Book = require('../models/Book');
const Review = require('../models/Review');

// Task 1: Get all books (Using async callback function)
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('reviews');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 2: Get books by ISBN (Using Promises)
const getBookByISBN = (req, res) => {
  Book.findOne({ isbn: req.params.isbn })
    .populate('reviews')
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    })
    .catch(error => res.status(500).json({ message: error.message }));
};

// Task 3: Get books by Author
const getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: new RegExp(req.params.author, 'i') }).populate('reviews');
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found by this author' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 4: Get books by Title
const getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ title: new RegExp(req.params.title, 'i') }).populate('reviews');
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 5: Get book review
const getBookReviews = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn }).populate('reviews');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 8: Add/Modify a book review
const addOrModifyReview = async (req, res) => {
  const { isbn, comment, rating } = req.body;
  try {
    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    let review = await Review.findOne({ book: book._id, user: req.user.id });
    if (review) {
      // Modify existing review
      review.comment = comment;
      review.rating = rating;
    } else {
      // Add new review
      review = new Review({
        book: book._id,
        user: req.user.id,
        comment,
        rating,
      });
      book.reviews.push(review._id);
    }
    await review.save();
    await book.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 9: Delete book review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.reviewId, user: req.user.id });
    if (!review) {
      return res.status(404).json({ message: 'Review not found or not authorized' });
    }
    await Book.updateOne({ _id: review.book }, { $pull: { reviews: review._id } });
    await Review.deleteOne({ _id: review._id });
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 10: Get all books (Using async/await)
const getAllBooksAsync = async (req, res) => {
  try {
    const books = await Book.find().populate('reviews');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 10: Get all books (Using callback function)
const getAllBooksCallback = (req, res) => {
  Book.find({}).populate('reviews')
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ message: err.message }));
};



// Task 11: Search by ISBN (Async/Await)
const getBookByISBNAsync = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn }).populate('reviews');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 11: Search by ISBN (Callback)
const getBookByISBNCallback = (req, res) => {
  Book.findOne({ isbn: req.params.isbn })
    .populate('reviews')
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Task 12: Search by Author (Async/Await)
const getBooksByAuthorAsync = async (req, res) => {
  try {
    const books = await Book.find({ author: new RegExp(req.params.author, 'i') }).populate('reviews');
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found by this author' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 12: Search by Author (Callback)
const getBooksByAuthorCallback = (req, res) => {
  Book.find({ author: new RegExp(req.params.author, 'i') })
    .populate('reviews')
    .then(books => {
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found by this author' });
      }
      res.json(books);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

// Task 13: Search by Title (Async/Await)
const getBooksByTitleAsync = async (req, res) => {
  try {
    const books = await Book.find({ title: new RegExp(req.params.title, 'i') }).populate('reviews');
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Task 13: Search by Title (Callback)
const getBooksByTitleCallback = (req, res) => {
  Book.find({ title: new RegExp(req.params.title, 'i') })
    .populate('reviews')
    .then(books => {
      if (books.length === 0) {
        return res.status(404).json({ message: 'No books found with this title' });
      }
      res.json(books);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
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
};