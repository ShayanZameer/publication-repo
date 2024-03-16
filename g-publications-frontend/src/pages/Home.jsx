import React, { useContext, useEffect, useState } from "react";
import Book from "../components/Book";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import Loader from "../components/Loader";

const Home = () => {
  const { allBooks, setAllBooks } = useContext(Context);
  const {searchText} = useContext(Context)
  const [ebook, setEbook] = useState(false);
  const [paperbook, setPaperbook] = useState(false);
  const [format, setFormat] = useState(false);
  const [english, setEnglish] = useState(false);
  const [urdu, setUrdu] = useState(false);
  const [lang, setLnag] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [sacred, setSacred] = useState(false);
  const [history, setHistory] = useState(false);
  const [comminSoon, setCommingSoon] = useState(false);
  const [childrenAndYouth, setChildrenAndYouth] = useState(false);
  const [newArrivals, setNewArrivals] = useState(false);
  const [devotions, setDevotions] = useState(false);
  const [intorductory, setIntroductory] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleEbookClick = () => {
    setEbook(!ebook);
    setFormat(false);
  };

  const handlePaperbookClick = () => {
    setPaperbook(!paperbook);
    setFormat(false);
  };

  const handleFormtaClick = () => {
    setFormat(!format);
    setEbook(false);
    setPaperbook(false);
  };

  const handleUrduClick = () => {
    setUrdu(!urdu);
  };

  const hanldeEnglishClick = () => {
    setEnglish(!english);
  };

  const hanldeLangClick = () => {
    setLnag(!lang);
    setUrdu(false);
    setEnglish(false);
  };

  const handleResetFilters = () => {
    setLnag(false);
    setEnglish(false);
    setUrdu(false);
    setEbook(false);
    setPaperbook(false);
    setFormat(false);

    setHistory(false);
    setChildrenAndYouth(false);
    setDevotions(false);
    setIntroductory(false);
    setSacred(false);
    setCommingSoon(false);
    setNewArrivals(false);
  };

  const toggleFilters = () => {
    setShowFilter(!showFilter);
  };

  const handleChildrenAndYouthClick = () => {
    setChildrenAndYouth(true);

    setDevotions(false);
    setIntroductory(false);
    setSacred(false);
    setCommingSoon(false);
    setHistory(false);
    setNewArrivals(false);
  };

  const handleHistoryClick = () => {
    setHistory(true);

    setChildrenAndYouth(false);
    setDevotions(false);
    setIntroductory(false);
    setSacred(false);
    setCommingSoon(false);
    setNewArrivals(false);
  };

  const handleCommingSoonClick = () => {
    setCommingSoon(true);

    setChildrenAndYouth(false);
    setDevotions(false);
    setIntroductory(false);
    setSacred(false);
    setHistory(false);
    setNewArrivals(false);
  };

  const handleDevotionClick = () => {
    setDevotions(true);

    setChildrenAndYouth(false);
    setIntroductory(false);
    setSacred(false);
    setCommingSoon(false);
    setHistory(false);
    setNewArrivals(false);
  };

  const handleNewArrivalsClick = () => {
    setNewArrivals(true);

    setChildrenAndYouth(false);
    setDevotions(false);
    setIntroductory(false);
    setSacred(false);
    setCommingSoon(false);
    setHistory(false);
  };

  const handleIntroductoryClick = () => {
    setIntroductory(true);

    setChildrenAndYouth(false);
    setDevotions(false);
    setSacred(false);
    setCommingSoon(false);
    setHistory(false);
    setNewArrivals(false);
  };

  const handleSacredClick = () => {
    setSacred(true);

    setChildrenAndYouth(false);
    setDevotions(false);
    setIntroductory(false);
    setCommingSoon(false);
    setHistory(false);
    setNewArrivals(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/books/all`)
      .then((resp) => {
        setAllBooks(resp.data.allBooks);
        console.log(allBooks);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Some error occured");
        console.log("eror: ", err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex-col gap-1 scroll-smooth">
          <div className="flex justify-end border-b border-slate-400 md:hidden">
            <div className="flex items-center justify-center gap-2 px-4 py-2 text-blue-400">
              <h1 className="flex" onClick={toggleFilters}>
                Filters
              </h1>
              {showFilter ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
            <div
              className={`flex-1 p-2 ${
                showFilter ? "max-md:block" : "max-md:hidden"
              }`}
            >
              <div className="">
                <h1 className="font-semibold">Books</h1>
                <ul className="flex flex-wrap gap-4 px-4 py-2 md:flex-col">
                  <li
                    className={`cursor-pointer ${
                      sacred ? "text-blue-500" : ""
                    }`}
                    onClick={handleSacredClick}
                  >
                    Sacred writings
                  </li>
                  <li
                    className={`cursor-pointer ${
                      history ? "text-blue-500" : ""
                    }`}
                    onClick={handleHistoryClick}
                  >
                    History
                  </li>
                  <li
                    className={`cursor-pointer ${
                      comminSoon ? "text-blue-500" : ""
                    }`}
                    onClick={handleCommingSoonClick}
                  >
                    Comming Soon
                  </li>
                  <li
                    className={`cursor-pointer ${
                      newArrivals ? "text-blue-500" : ""
                    }`}
                    onClick={handleNewArrivalsClick}
                  >
                    New Arrivals
                  </li>
                  <li
                    className={`cursor-pointer ${
                      childrenAndYouth ? "text-blue-500" : ""
                    }`}
                    onClick={handleChildrenAndYouthClick}
                  >
                    Children and Youth
                  </li>
                  <li
                    className={`cursor-pointer ${
                      devotions ? "text-blue-500" : ""
                    }`}
                    onClick={handleDevotionClick}
                  >
                    Devotions
                  </li>
                  <li
                    className={`cursor-pointer ${
                      intorductory ? "text-blue-500" : ""
                    }`}
                    onClick={handleIntroductoryClick}
                  >
                    Introductory Books
                  </li>
                </ul>
                <h1 className="font-semibold">Book format</h1>
                <ul className="flex flex-wrap gap-4 px-4 py-2 md:flex-col md:gap-0">
                  <li>
                    <input
                      onClick={handleEbookClick}
                      type="checkbox"
                      checked={ebook}
                    />{" "}
                    Ebook
                  </li>
                  <li>
                    <input
                      onClick={handlePaperbookClick}
                      type="checkbox"
                      checked={paperbook}
                    />{" "}
                    Paper Book
                  </li>
                  <li>
                    <input
                      onClick={handleFormtaClick}
                      type="checkbox"
                      checked={format}
                    />{" "}
                    both
                  </li>
                </ul>
                <h1 className="font-semibold">Book Language</h1>
                <ul className="flex flex-wrap gap-4 px-4 py-2 md:gap-0 md:flex-col">
                  <li>
                    <input
                      type="checkbox"
                      checked={english}
                      onClick={hanldeEnglishClick}
                    />{" "}
                    English
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={urdu}
                      onClick={handleUrduClick}
                    />{" "}
                    Urdu
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      checked={lang}
                      onClick={hanldeLangClick}
                    />{" "}
                    All
                  </li>
                </ul>
                <h1
                  onClick={handleResetFilters}
                  className="flex justify-center px-3 py-1 font-semibold bg-yellow-400 rounded-md cursor-pointer md:justify-start hover:bg-yellow-300"
                >
                  Reset filters
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-start flex-[5] gap-4 justify-center p-4 flex-wrap">
              {allBooks.map((i) => {
                if (sacred && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (sacred && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (sacred && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (sacred && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (sacred && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (sacred && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (sacred)
                  return i.category.toLowerCase() === "sacred" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (history)
                  return i.category.toLowerCase() === "history" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (comminSoon)
                  return i.category.toLowerCase() === "comming soon" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (newArrivals)
                  return i.category.toLowerCase() === "new arrivals" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (devotions)
                  return i.category.toLowerCase() === "devotion" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (childrenAndYouth)
                  return i.category.toLowerCase() === "children and youth" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory && ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory && ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory && ebook)
                  return (i.format === "Ebook" || i.format === "both") &&
                    i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory && paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") &&
                    i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory && paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") &&
                    i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory && paperbook)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (intorductory)
                  return i.category.toLowerCase() === "introductory" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (ebook && english)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (ebook && urdu)
                  return (i.format === "Ebook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (ebook)
                  return i.format === "Ebook" || i.format === "both" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (paperbook && english)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "English" || i.language === "both") ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (paperbook && urdu)
                  return (i.format === "Paperbook" || i.format === "both") &&
                    (i.language === "urdu" || i.language === "both") ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (paperbook)
                  return i.format === "Paperbook" || i.format === "both" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (english)
                  return i.language === "English" || i.language === "both" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (urdu)
                  return i.language === "urdu" || i.language === "both" ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                if (searchText)
                  return i.title.toLowerCase().includes(searchText.toLowerCase()) ? (
                    <Book
                      title={i.title}
                      bookData={i}
                      author={i.author}
                      price={i.ebookPrice}
                      category={i.category}
                      stock={i.stock}
                      coverPage={i.coverPage}
                      format={i.format}
                      id={i._id}
                      key={i._id}
                    />
                  ) : (
                    ""
                  );

                return (
                  <Book
                    title={i.title}
                    bookData={i}
                    author={i.author}
                    price={i.price === 0 ? i.ebookPrice : i.price}
                    category={i.category}
                    stock={i.stock}
                    coverPage={i.coverPage}
                    format={i.format}
                    id={i._id}
                    key={i._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
