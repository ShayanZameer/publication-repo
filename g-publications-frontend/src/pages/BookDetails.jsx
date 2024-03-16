import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import profile from "../assets/profile.png";
import Review from "../components/Review";
import ReviewSystem from "../components/ReviewSystem";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import BookPreview from "../components/BookPreview";

const BookDetails = () => {
  const navigate = useNavigate();

  const { currentBook, allBooks, setCurrentBook } = useContext(Context);

  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [ebook, setEbook] = useState(false);
  const [hardcopy, setHardcopy] = useState(true);
  const [publishDate, setPublishDate] = useState("");
  const [showReview, setShowReview] = useState(false);

  const [reviewerName, setReviewerName] = useState("");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [avgStars, setAvgStars] = useState(null);
  const [urduBookFile, setUrduBookFile] = useState("");

  const [loc, setloc] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  // const handlePaymentRedirect = async () => {
  //   toast.success("Button clicked");
  //   const resp = await axios.get(`${server}/payment/token`);
  //   const tokenData = resp.data.tokenData;
  //   console.log(tokenData.ACCESS_TOKEN);
  //   localStorage.setItem("paymentToken", tokenData.ACCESS_TOKEN);
  //   navigate("/testform");
  //   toast.success("response reached");
  // };

  const handleAvgStars = () => {
    let avg = 0;
    // let len = currentBook.reviews.length;
    let len = 4;
    console.log("len of reviews : ", len);
    if (len === 0) {
      setAvgStars(0);
    }
  };

  const handleShowReview = () => {
    setShowReview(!showReview);
  };

  const handleEbok = () => {
    setEbook(true);
    setHardcopy(false);
  };

  const handleHardCopy = () => {
    setEbook(false);
    setHardcopy(true);
  };

  const handleDellBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${server}/books/delete/${id}`);
      const data = resp.data;
      if (data.success) {
        toast.success("Book deleted successfully");
        setLoading(false);
        navigate("/");
      } else {
        toast.error("Cannot delete book");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting the Book");
    }
  };

  // const getUserLoc = async () => {
  //   const res = await axios.get("https://ipinfo.io/json");
  //   const countryData = await axios.get(
  //     `https://restcountries.com/v3/alpha/${res.data.country}`
  //   );
  //   setloc(countryData.data[0].name.common);
  // };
  const [sampleread, setsampleread] = useState(false);

  const handlereadsample = () => {
    setsampleread(!sampleread);
  };
  const handleAddReview = async () => {
    // getUserLoc();
    let format = ebook ? "ebook" : "paperbook";
    console.log(format);

    const data = {
      reviewerName,
      headline,
      bookId: id,
      content,
      format,
      country: "Pakistan",
      rating: 4,
    };

    const resp = await axios.post(`${server}/books/${id}/reviews/new`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(" review added successfully!");

    console.log(resp.data);
  };

  const handleshowFormat = () => {
    setEbook(currentBook.format === "Ebook");
  };

  const handleUrduBookReading = async () => {
    const resp = await axios.get(`${urduBookFile}`);
    // console.log(resp.data);
  };

  useEffect(() => {
    axios
      .get(`${server}/books/${id}`)
      .then((resp) => {
        setCurrentBook(resp.data.book[0]);
        console.log(resp.data.book[0]);
        const book = resp.data.book[0];
        setUrduBookFile(book.urduFile);

        const reviews = book.reviews;
        console.log(reviews);
        let stars = 0;
        if (reviews) {
          const len = reviews.length;
          console.log(len);
          reviews.forEach((element) => {
            stars += element.rating;
          });

          stars = Math.fround(stars / len);
          console.log("avg stars: ", stars);
          setRating(stars);

          var date = new Date(currentBook.createdAt);
          setPublishDate(date.toUTCString().substring(0, 11));
        }
        handleAvgStars();
        setLoading(false);
      })
      .catch((err) => {
        toast.error("internal server error");
        console.log(err);
        setLoading(true);
      });
  }, []);

  return (
    <>
      {sampleread ? (
        <BookPreview
          firstBook={
            currentBook.book1stpage ? currentBook.book1stpage : undefined
          }
          secondBook={
            currentBook.book2ndpage ? currentBook.book2ndpage : undefined
          }
          thirdBook={
            currentBook.book3rdpage ? currentBook.book3rdpage : undefined
          }
          forthBook={
            currentBook.book4thpage ? currentBook.book4thpage : undefined
          }
          fifthBook={
            currentBook.book5thpage ? currentBook.book5thpage : undefined
          }
          handleshowBookpreview={handlereadsample}
        />
      ) : (
        <div>
          {loading ? <Loader /> : ""}
          <div
            onLoad={handleshowFormat}
            className={`main flex flex-col ${loading ? "hidden" : "block"}`}
          >
            <div className="flex flex-col md:flex-row">
              <div className="left mt-4 p-4 flex gap-8 flex-[4] max-md:hidden">
                <div className="imgdiv flex-[1] flex flex-col">
                  <div className="flex flex-col items-center justify-center p-2">
                    <img
                      src={currentBook.coverPage}
                      alt="Image from book ${title}"
                      className="p-2 w-52"
                    />
                    <button
                      onClick={handlereadsample}
                      className="flex justify-center w-full p-2 border rounded-lg hover:bg-slate-50"
                    >
                      Read sample
                    </button>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-2 mt-4">
                    <h1 className="font-semibold">About Author</h1>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-20 h-20 rounded-full"
                          src={profile}
                          alt="author img"
                        />
                        <a href="#" className="text-blue-400">
                          {currentBook.author}
                        </a>
                      </div>
                      <button className="w-1/3 px-3 py-1 border rounded-md hover:bg-slate-50 border-slate-400">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="detaildiv flex-[2]">
                  <div className="flex items-center">
                    <div className="flex flex-col flex-1 p-3 text-sm">
                      <h1 className="text-2xl">{currentBook.title}</h1>
                      <p className="">
                        by &nbsp;
                        <span className="text-blue-400 cursor-pointer">
                          {currentBook.author}
                        </span>
                      </p>
                      <div className="flex gap-3">
                        <ReviewSystem value={rating} editable={false} />
                        <span className="text-blue-400">
                          <a href="#reviews">
                            {currentBook.reviews
                              ? currentBook.reviews.length
                              : "0"}
                            &nbsp; reviews
                          </a>
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex justify-end flex-1 ${
                        isAuthenticated ? "block" : "hidden"
                      }`}
                    >
                      <button
                        onClick={handleDellBook}
                        className="px-3 py-1 bg-yellow-500 rounded-md hover:bg-yellow-400 "
                      >
                        Delete this book
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="my-3">
                    <div className="flex gap-3 text-sm">
                      <div
                        onClick={handleEbok}
                        className={`${
                          currentBook.format === "Paperbook"
                            ? "hidden"
                            : "block"
                        } w-40 cursor-pointer rounded-md format flex flex-col border p-2 ${
                          ebook ? "border-4 border-blue-400 bg-blue-100" : ""
                        }  hover:bg-blue-200`}
                      >
                        <p className="">E-book</p>
                        <p>$ {currentBook.ebookPrice}.00</p>
                      </div>
                      <div
                        onClick={handleHardCopy}
                        className={`${
                          currentBook.format === "Ebook" ? "hidden" : "block"
                        } w-40 cursor-pointer rounded-md format flex flex-col border p-2 ${
                          hardcopy ? "border-4 border-blue-400 bg-blue-100" : ""
                        } hover:bg-blue-200`}
                      >
                        <p className="">Hard copy</p>
                        <p>$ {currentBook.price}.00</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <p>{currentBook.description}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="">
                    <div className="flex gap-8 mt-8 snap-x">
                      <div className="flex flex-col items-center justify-center gap-4 snap-start">
                        <p>Print Length</p>
                        <p>
                          <i className="fa-regular fa-file-lines"></i>
                        </p>
                        <p className="font-semibold">
                          {currentBook.noOfPages} pages
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-4 snap-start">
                        <p>Language</p>
                        <p>
                          <i className="fa-solid fa-earth-americas"></i>
                        </p>
                        <p className="font-semibold">{currentBook.language}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-4 snap-start">
                        <p>Publication date</p>
                        <p>
                          <i className="fa-regular fa-calendar-days"></i>
                        </p>
                        <p className="font-semibold">{publishDate}</p>
                      </div>
                      {/* {hardcopy ? (
                    <div className="flex flex-col items-center justify-center gap-4 snap-start">
                    <p>Dimensions</p>
                    <p>
                    <i className="fa-regular fa-file-lines"></i>
                    </p>
                    <p className="font-semibold">{currentBook.dimension} </p>
                    </div>
                    ) : (
                      ""
                    )} */}
                      {/* <div className="flex flex-col items-center justify-center gap-4">
                    <p>ISBN</p>
                    <p>
                    <i className="fa-solid fa-barcode"></i>
                    </p>
                    <p className="font-semibold">3242287483929283</p>
                  </div> */}
                      {ebook ? (
                        <div className="flex flex-col items-center justify-center gap-4 snap-start">
                          <p>File size</p>
                          <p>
                            <i className="fa-regular fa-file-lines"></i>
                          </p>
                          <p className="font-semibold">
                            {currentBook.fileSize} kb
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="flex flex-col items-center justify-center gap-4 snap-start">
                        <a href="#details" className="text-sm text-blue-500">
                          View all <br /> details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden">
                <div className="p-4">
                  <div>
                    <div className="flex flex-col">
                      <span className="text-blue-400 cursor-pointer">
                        {currentBook.author}
                      </span>
                      <span className="text-sm cursor-pointer">
                        {currentBook.title}
                      </span>
                      <span className="flex items-center gap-3">
                        <ReviewSystem value={rating} editable={false} />
                        <span className="text-blue-400">
                          <a href="#reviews">
                            {currentBook.reviews
                              ? currentBook.reviews.length
                              : "0"}
                            &nbsp; reviews
                          </a>
                        </span>
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-center">
                        <img
                          className="w-10/12"
                          src={currentBook.coverPage}
                          alt=""
                        />
                      </div>
                      <div className="flex items-center justify-center pt-8">
                        <p
                          onClick={handlereadsample}
                          className="flex justify-center w-full p-4 border border-black rounded-md hover:bg-black hover:bg-opacity-5"
                        >
                          Read Sample
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-gray-600">
                      <div className="p-4 mb-4">
                        <div className="flex gap-3 text-sm">
                          <div
                            onClick={handleEbok}
                            className={`${
                              currentBook.format === "Paperbook"
                                ? "hidden"
                                : "block"
                            } flex-1 cursor-pointer font-bold justify-center items-center rounded-md format flex flex-col border p-2 ${
                              ebook
                                ? "border-2 border-orange-500 bg-blue-100"
                                : ""
                            }  hover:bg-blue-200`}
                          >
                            <p className="">E-book</p>
                            <p>$ {currentBook.ebookPrice}.00</p>
                          </div>
                          <div
                            onClick={handleHardCopy}
                            className={`${
                              currentBook.format === "Ebook"
                                ? "hidden"
                                : "block"
                            } flex-1 font-bold justify-center items-center cursor-pointer rounded-md format flex flex-col border p-2 ${
                              hardcopy
                                ? "border-2 border-orange-500 bg-blue-100"
                                : ""
                            } hover:bg-blue-200`}
                          >
                            <p className="">Hard copy</p>
                            <p>$ {currentBook.price}.00</p>
                          </div>
                            </div>
                          {/* <div className="w-full pt-3"> */}
                            <button
                              onClick={handleDellBook}
                              className="w-full px-3 py-1 mt-3 bg-yellow-500 rounded-md hover:bg-yellow-400 "
                            >
                              Delete this book
                            </button>
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="border-b border-gray-600">
                      <div className="py-4">
                        <div className="flex flex-col">
                          <h1 className="my-4 font-bold">Book Overview</h1>
                          <p>{currentBook.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-600">
                      <div className="p-4">
                        <div>
                          <div>
                            <h1 className="font-bold">Book Details</h1>
                          </div>
                          <div>
                            <div className="flex flex-wrap gap-8 mt-8">
                              <div className="flex flex-col items-center justify-center gap-4 snap-start">
                                <p>Print Length</p>
                                <p>
                                  <i className="fa-regular fa-file-lines"></i>
                                </p>
                                <p className="font-semibold">
                                  {currentBook.noOfPages} pages
                                </p>
                              </div>
                              <div className="flex flex-col items-center justify-center gap-4 snap-start">
                                <p>Language</p>
                                <p>
                                  <i className="fa-solid fa-earth-americas"></i>
                                </p>
                                <p className="font-semibold">
                                  {currentBook.language}
                                </p>
                              </div>
                              <div className="flex flex-col items-center justify-center gap-4 snap-start">
                                <p>Publication date</p>
                                <p>
                                  <i className="fa-regular fa-calendar-days"></i>
                                </p>
                                <p className="font-semibold">{publishDate}</p>
                              </div>
                              {hardcopy ? (
                                <div className="flex flex-col items-center justify-center gap-4 snap-start">
                                  <p>Dimensions</p>
                                  <p>
                                    <i className="fa-regular fa-file-lines"></i>
                                  </p>
                                  <p className="font-semibold">
                                    {currentBook.dimension}{" "}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              {ebook ? (
                                <div className="flex flex-col items-center justify-center gap-4 snap-start">
                                  <p>Book size</p>
                                  <p>
                                    <i className="fa-regular fa-file-lines"></i>
                                  </p>
                                  <p className="font-semibold">
                                    {currentBook.fileSize} kb
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              <div className="flex flex-col items-center justify-center gap-4 snap-start">
                                <a
                                  href="#details"
                                  className="text-sm text-blue-500"
                                >
                                  View all <br /> details
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="about-author">
                      <div className="flex flex-col gap-2 mt-4">
                        <h1 className="font-semibold">Author</h1>
                        {/* <p>
                      Know more about the author, top books by this author and
                      much more.
                    </p> */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-4">
                            <img
                              className="w-20 h-20 rounded-full"
                              src={profile}
                              alt="author img"
                            />
                            <a href="##" className="text-blue-400">
                              {currentBook.author}
                            </a>
                          </div>
                          <div className="flex justify-center">
                            {/* <Link>
                        <button className="w-1/3 px-3 py-1 border rounded-md hover:bg-slate-50 border-slate-400">
                        Details
                        </button>
                        </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-4 p-4 mt-8 text-sm right">
                <div className="flex flex-col gap-2 p-3 border-2 rounded-lg">
                  <div className="flex justify-between p-2">
                    <p className="font-semibold">
                      {ebook ? "Only for:" : "Buy new:"}
                    </p>
                    <p className="text-lg font-semibold text-orange-700">
                      $ {ebook ? currentBook.ebookPrice : currentBook.price}.00
                    </p>
                  </div>
                  {hardcopy ? (
                    <div className="flex flex-col gap-2">
                      <div>
                        <p>Import fee and shipping charges will be applied.</p>
                      </div>
                      <div>
                        <p>Dilevery can take 3 to 10 working days</p>
                      </div>
                      <div>
                        {/* <p>Or fastest dielvery Tuesday August 15</p> */}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold tracking-wider text-green-600">
                          In Stock
                        </p>
                        {/* <p className="">Qty: 1</p> */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex">
                    <button className="flex items-center justify-center w-full p-1 rounded-2xl">
                      {ebook ? (
                        <Link
                          className="w-full p-1 bg-orange-500 rounded-2xl hover:bg-orange-600"
                          to={"/payment/ebook"}
                        >
                          Buy Now
                        </Link>
                      ) : (
                        // <button className="" onClick={handlePaymentRedirect}>
                        //   buy now
                        // </button>
                        <Link
                          className="w-full p-1 bg-orange-500 rounded-2xl hover:bg-orange-600"
                          to="/payment"
                        >
                          Buy Now
                        </Link>
                        // <button className="" onClick={handlePaymentRedirect}>
                        //   Buy now
                        // </button>
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`flex flex-col border-2 gap-2 p-3 rounded-lg ${
                    urduBookFile ? "block" : "hidden"
                  } `}
                >
                  <div className="flex justify-between p-2">
                    <p className="font-semibold">Price</p>
                    <p className="text-lg font-semibold text-orange-700">$ 0</p>
                  </div>
                  <div>
                    <p>You can read the urdu version for free.</p>
                  </div>
                  <div className={`flex`}>
                    <button className="flex items-center justify-center w-full p-1 bg-orange-500 rounded-2xl hover:bg-orange-600">
                      <a href={urduBookFile}>Read Now</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="book-detials" id="details">
              <div className="m-3 border-t border-slate-500">
                <h1 className="mt-2 text-2xl font-semibold">Product Details</h1>
                <div className="p-4">
                  <p>
                    <span>Publisher : </span> {currentBook.publisher}
                  </p>
                  <p>
                    <span>Language : </span> {currentBook.language}
                  </p>
                  <p>
                    <span>Paperback : </span> {currentBook.noOfPages} pages
                  </p>
                  <p>
                    <span>ISBN-10 : </span> {currentBook.isbn10}
                  </p>
                  <p>
                    <span>ISBN-13 : </span> {currentBook.isbn13}
                  </p>
                  {hardcopy ? (
                    <p>
                      <span>Item Weight : </span> {currentBook.weight} ounces
                    </p>
                  ) : (
                    ""
                  )}
                  {hardcopy ? (
                    <p>
                      <span>Dimension : </span> {currentBook.dimension}
                    </p>
                  ) : (
                    ""
                  )}
                  {ebook ? (
                    <p>
                      <span>File size : </span> {currentBook.fileSize} KB
                    </p>
                  ) : (
                    ""
                  )}
                  <p>
                    <span>Customer Reviews : </span>
                    <a
                      className="text-blue-400 hover:text-blue-500"
                      href="#reviews"
                    >
                      {currentBook.reviews ? currentBook.reviews.length : "0"}
                      ratings
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-4 review scroll-smooth" id="reviews">
              <div className="flex flex-col gap-8 p-4 mt-4 border-t md:flex-row border-slate-400">
                <div className="left flex-[2] px-4 ">
                  <h1 className="text-2xl font-bold">Customer Reviews</h1>
                  <p className="text-xl font-semibold"> {avgStars} out of 5</p>
                  <p className="py-2 text-slate-600">
                    {currentBook.reviews ? currentBook.reviews.length : "0"}{" "}
                    global ratings
                  </p>
                  {/* <div className="p-4 border-b border-slate-400">
                <div className="flex gap-2">
                <p>5 star</p>
                <input type="range" readOnly />
                <p>78%</p>
                </div>
                <div className="flex gap-2">
                <p>4 star</p>
                <input type="range" className="h-2" readOnly />
                <p>78%</p>
                </div>
                <div className="flex gap-2">
                  <p>3 star</p>
                  <input type="range" readOnly />
                  <p>78%</p>
                  </div>
                <div className="flex gap-2">
                  <p>2 star</p>
                  <input type="range" readOnly />
                  <p>78%</p>
                  </div>
                  <div className="flex gap-2">
                  <p>1 star</p>
                  <input type="range" readOnly />
                  <p>78%</p>
                  </div>
                </div> */}
                  <div className="flex flex-col border-t">
                    <div className="">
                      <h1 className="text-lg font-semibold">
                        Review this product
                      </h1>
                      <div className="flex flex-col gap-4 ">
                        <p className="">Share your thoughts with us now</p>
                        <button
                          onClick={handleShowReview}
                          className="flex justify-center w-4/5 px-3 py-1 border rounded-md hover:bg-slate-50"
                        >
                          Write a constomer review
                        </button>
                      </div>
                    </div>
                    <div
                      className={`${
                        showReview ? "block" : "hidden"
                      } flex border-t border-slate-700 mt-4 pt-4`}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex text-2xl font-bold">Ratings</div>
                        <div>
                          <ReviewSystem editable={true} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="font-semibold">Your name</h1>
                          <input
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            type="text"
                            className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="font-semibold">Title</h1>
                          <input
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            type="text"
                            className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h1 className="font-semibold">Write review</h1>
                          <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                          ></textarea>
                        </div>
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={handleShowReview}
                            className="px-2 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddReview}
                            className="px-2 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right flex-[3]" id="reviews">
                  <h1 className="py-2 text-lg font-semibold">
                    Customer reviews
                  </h1>
                  {currentBook.reviews ? (
                    currentBook.reviews.length !== 0 ? (
                      currentBook.reviews.map((i) => (
                        <Review
                          name={i.reviewerName}
                          title={i.headline}
                          content={i.content}
                          date_review={i.createdAt}
                          key={i.reviewerName}
                          rating={i.rating}
                        />
                      ))
                    ) : (
                      <div className="px-4 py-2 rounded-md bg-slate-300">
                        {" "}
                        No reviews to show
                      </div>
                    )
                  ) : (
                    <div className="px-4 py-2 rounded-md bg-slate-300">
                      {" "}
                      No reviews found
                    </div>
                  )}
                </div>
                <div className="flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
