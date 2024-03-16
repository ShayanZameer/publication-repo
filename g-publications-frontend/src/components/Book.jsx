import React, { useContext } from "react";
import cover from "../assets/cover.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

const Book = ({
  title,
  author,
  coverPage,
  category,
  format,
  price,
  stock,
  date,
  id,
  bookData,
}) => {
  const Navigation = useNavigate();
  const { currentBook, setCurrentBook } = useContext(Context);
  const hanldeClick = () => {
    console.log(id);
    handleStorage();
    setCurrentBook(bookData);
  };
  const handleStorage = () => {
    sessionStorage.setItem("currentBook", JSON.stringify({ ...bookData }));
  };
  return (
    <>
      <div
        className="flex w-full max-md:flex-1 md:flex-col md:w-60 book-card"
        style={{ height: "610px" }}
      >
        <div className="flex items-center justify-center flex-1 px-4 cover bg-slate-100">
          <Link to={`/book/${id}`} onClick={hanldeClick}>
            <img
              src={coverPage ? coverPage : cover}
              alt="book cover here"
              width="150px"
              height="200px"
            />
          </Link>
        </div>
        <div className="flex flex-col flex-[2] p-4 content md:bg-slate-50">
          <div className="title-author">
            <h1 className="text-lg hover:text-orange-500">
              <Link to={`/book/${id}`} onClick={hanldeClick}>
                {title.length > 105 ? title.substring(0, 105) : title}
                {title.length > 105 ? "..." : ""}
              </Link>
            </h1>
            <p>
              by &nbsp;
              <Link
                onClick={hanldeClick}
                to={`/book/${id}`}
                className="text-sm text-blue-500 hover:text-orange-500"
              >
                {author}
              </Link>
            </p>
          </div>
          <div className="flex reviews">
            <p>5 stars</p>
            <p> &nbsp; 100</p>
          </div>
          <div className="format-and-price">
            <Link to={`/book/${id}`} onClick={hanldeClick}>
              <p className="font-semibold text-blue-500 hover:text-orange-500">
                {format === "both" ? "E-book, Hard Cover" : format}
              </p>
              <p className="flex text-2xl font-semibold price">
                <span className="flex text-xs font-normal">$</span> {price}
                <span className="flex text-xs font-normal">99</span>
              </p>
            </Link>
          </div>
          <div>
            <p>
              Delivery &nbsp;
              <span className="font-semibold" onClick={hanldeClick}>
                wed, Aug 9
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs">Ships to country</p>
            <p
              className={`${
                stock === 0 ? "text-orange-500" : "text-green-500"
              } font-bold text-orange-500 text-sm`}
            >
              {/* {stock > 0 ? "In stock" : "Out of stock"} */}
              In stock
            </p>
          </div>
          <div>
            <p className="mt-2">
              other format:&nbsp;
              <Link to={`/book/${id}`} onClick={hanldeClick}>
                <span className="font-semibold text-blue-500 hover:text-orange-500">
                  {format === "ebook" ? "Hard Cover" : "E-book"}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
