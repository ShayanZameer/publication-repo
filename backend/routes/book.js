import express from "express";
import { addBook, addReview, addUrduBook, deleteBook, getAllBooks, getSingleBook } from "../controllers/book.js";
// import { makePaymet } from "../controllers/paymentController.js";
// import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();
 
router.post("/new", addBook);
router.post("/new/urdu", addUrduBook);
router.get("/all", getAllBooks);
router.get("/:id", getSingleBook);
router.post('/:bookId/reviews/new', addReview);

router.get("/delete/:bookId", deleteBook);
// router.post('/payment/new', makePaymet);

export default router;