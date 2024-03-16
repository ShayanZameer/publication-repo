import uploadFilesMiddleware from "../middlewares/upload.js";
import { Book } from "../models/book.js";

export const addBook = async (req, res, next) => {
  try {
    // try {
    //   await uploadFilesMiddleware(req, res);
    //   if (req.file === undefined) {
    //     return res.status(400).json({
    //       message: "please select a file first",
    //       success: false,
    //     });
    //   }
    // } catch (error) {
    //   console.log("Error in file uploading");
    //   console.log(error.message);
    // }

    const {
      title,
      publisher,
      isbn10,
      isbn13,
      asinNumber,
      ebookPrice,
      urduPrice,
      author,
      noOfPages,
      format,
      description,
      coverPage,
      otherCoverPages,
      category,
      price,
      stock,
      publishingDate,
      language,
      dimension,
      weight,
      fileSize,
      book1stpage,
      book2ndpage,
      book3rdpage,
      book4thpage,
      book5thpage,
    } = req.body;
    // const fileUrl = process.env.BASE_URL + req.fileId;
    const book = await Book.create({
      title,
      publisher,
      isbn10,
      isbn13,
      asinNumber,
      ebookPrice,
      urduPrice,
      author,
      noOfPages,
      format,
      description,
      coverPage,
      otherCoverPages,
      category,
      price,
      stock,
      publishingDate,
      language,
      dimension,
      weight,
      fileSize,
      book1stpage,
      book2ndpage,
      book3rdpage,
      book4thpage,
      book5thpage,
    });
    return res.status(201).json({
      success: true,
      message: "book added successfullly",
      book,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({
      success: false,
      message: "book cannot be added",
      err: error.message,
    });
  }
};

export const addUrduBook = async (req, res) => {
  try {
    try {
      await uploadFilesMiddleware(req, res);
      if (req.file === undefined) {
        return res.status(400).json({
          message: "please select a file first",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        message: "error in file uploading",
        success: false,
        err: error.message,
      });
    }
    const { bookId } = req.body;
    let book = await Book.findById(bookId);
    book.urduFile = process.env.BASE_URL + req.file.id;
    book.save();

    return res.status(201).json({
      message: "Urdu version added successfully!",
      success: true,
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Urdu book cannot be added",
      success: false,
      err: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  const allBooks = await Book.find({}, { fileUrl: 0 });

  if (!allBooks)
    return res.status(404).json({
      message: "No records found",
      success: false,
    });

  return res.status(200).json({
    success: true,
    allBooks,
  });
};

export const getSingleBook = async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.find({ _id: bookId });

  if (!book)
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });

  return res.status(200).json({
    success: true,
    book,
  });
};

export const updateBookDetials = async (req, res) => {
  const {
    bookId,
    title,
    author,
    description,
    format,
    noOfPages,
    category,
    price,
    urduPrice,
    ebookPrice,
    coverPage,
    otherCoverPages,
    stock,
    language,
    dimension,
    weight,
    publicationDate,
  } = req.body;

  const book = await Book.find({ _id: bookId });
  if (!book)
    return res.status(404).json({
      success: false,
      message: `Book with id ${bookId} not found!`,
    });

  const updatedBook = await Book.updateOne({
    title,
    author,
    description,
    format,
    noOfPages,
    category,
    price,
    urduPrice,
    ebookPrice,
    coverPage,
    otherCoverPages,
    stock,
    language,
    dimension,
    weight,
    publicationDate,
  });

  return res.status(200).json({
    success: true,
    message: "Book updated successfully!",
    updatedBook,
  });
};

export const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByIdAndDelete({ _id: bookId });

    return res.status(200).json({
      success: true,
      book,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal server error",
      err: error.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { bookId, reviewerName, headline, format, country, content, rating } =
      req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = {
      book: bookId,
      reviewerName,
      headline,
      content,
      rating,
      country,
      format,
      createdAt: Date.now(),
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).json({
      success: true,
      newReview,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add review" });
  }
};
