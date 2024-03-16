import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import { blobToWebP } from "webp-converter-browser";
import { auth, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddBook = () => {
  const { isAuthenticated } = useContext(Context);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn10, setIsbn10] = useState("");
  const [isbn13, setIsbn13] = useState("");
  const [asin, setAsin] = useState("");
  const [noOfPages, setNoOfPages] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [fileSize, setFileSize] = useState("");

  const [get1stPage, set1stPage] = useState("");
  const [get2ndPage, set2ndPage] = useState("");
  const [get3rdPage, set3rdPage] = useState("");
  const [get4thPage, set4thPage] = useState("");
  const [get5thPage, set5thPage] = useState("");

  const [weight, setWeight] = useState("");
  const [publishingDate, setPublishingDate] = useState("");
  const [coverPage, setCoverPage] = useState("");
  const [bookFile, setBookFile] = useState("");
  const [urduFile, setUrduFile] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrdu, setSelectedFileUrdu] = useState(null);

  // LANGUAGE STATES
  const [urdu, setUrdu] = useState(false);
  const [english, setEnglish] = useState(false);
  const [lang, setLang] = useState("");

  // FORMAT STATES
  const [format, setFormat] = useState("");
  // radio btn
  const [ebook, setEbook] = useState(false);
  const [paperbook, setPaperbook] = useState(false);
  // prices
  const [ebookPrice, setEbookPrice] = useState("");
  const [paperbookPrice, setPaperbookPrice] = useState("");
  const [urduPrice, setUrduPrice] = useState("");

  // Loading the page
  const [loading, setLoading] = useState(false);

  // disabled btn
  const [disabledBtn, setDisabledBtn] = useState(false);

  //DIMESION STATES
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  // const [first5images, setfirst5images] = useState([]);

  // FORMAT HANDLERS
  const handleFormat = () => {
    setFormat("both");
    setEbook(true);
    setPaperbook(true);
    toast.success("both");
  };

  const handlePaperbook = () => {
    setFormat("Paperbook");
    setPaperbook(true);
    setEbook(false);
    toast.success("Paperbook");
  };

  const handleEbook = () => {
    setFormat("Ebook");
    setEbook(true);
    setPaperbook(false);
    toast.success("ebook");
  };

  //   LNAGUAGE HANLDERS
  const handleLang = () => {
    setLang("both");
    setUrdu(true);
    setEnglish(true);
  };

  const handleUrdu = () => {
    setLang("Urdu");
    setUrdu(true);
    setEnglish(false);
  };

  const handleEnglish = () => {
    setLang("English");
    setEnglish(true);
    setUrdu(false);
  };

  // state of form
  const [showState, setShowState] = useState(true);
  const [my2ndbooklink, setmy2ndbooklink] = useState("");

  const handleShowState = () => {
    setDisabledBtn(false);
    setShowState(!showState);
  };

  const hanldePreviewBookDetails = async (e) => {
    if (
      (title,
      description,
      author,
      category,
      format,
      lang,
      publisher,
      noOfPages,
      publishingDate)
    ) {
      handleShowState();
    } else {
      toast.error("Fill all fields first");
    }
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setPublisher("");
    setNoOfPages("");
    setCategory("");
    setStock("");
    setEbook(false);
    setPaperbook(false);
    setUrdu(false);
    setEnglish(false);
    setWeight("");
    setWidth("");
    setHeight("");
    setLength("");
    setEbookPrice("");
    setPaperbookPrice("");
    setCoverPage("");
    setBookFile("");
    setPublishingDate("");
    setIsbn10("");
    setIsbn13("");
    setAsin("");
    setDisabledBtn(false);
  };

  // ----------------------------

  const [covers, setCovers] = useState([]);

  const handleBackCoversSubmit = async (e) => {
    await handleBackCoverUpload(e);
    console.log("inside submit handler : ", image);
    // const blob = new Blob([file], { type: file.type });
    // console.log(blob);
    // const webpFile = await blobToWebP(blob);
    // console.log("inside front cover input ");
    // console.log(webpFile);
    // let myfile;
    // const base64 = new FileReader();
    // base64.readAsDataURL(webpFile);
    // base64.onload = () => {
    //   setImage(base64.result);
    //   myfile = base64.result;
    //   console.log(myfile);
    // };
    // base64.onerror = (error) => {
    //   console.log("Error: ", error);
    // };
  };

  // const handleUploadUrduTest = async (e) => {
  //   console.log("handle upload urdu test");
  //   const formData2 = new FormData();
  //   formData2.append("file", selectedFileUrdu);
  //   formData2.append("bookId", "64e99eb9d87abc92e85d3f46");
  //   formData2.append("name");

  //   const resp2 = await axios.post(`${server}/books/new/urdu`, formData2, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });

  //   console.log(resp2.data);
  //   toast.success("Some response");
  // };

  const handleBackCoverUpload = async (e) => {
    try {
      const file = e.target.files;
      console.log(file);
      for (let i = 0; i < file.length; i++) {
        let myfiles = covers;
        const base64 = new FileReader();
        base64.readAsDataURL(file[i]);
        base64.onload = () => {
          myfiles.push(base64.result);
          setCovers(myfiles);
        };
        base64.onerror = (error) => {
          console.log("Error: ", error);
        };

        base64.onloadend = () => {
          setCovers(myfiles);
        };
      }
      console.log(covers);
    } catch (error) {
      console.log(error.message + "error cought in hanlde upload");
    }
  };

  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    await handleFrontCoverUpload(e);
    console.log("inside submit handler : ", image);
  };
  // webp.grant_permission()
  const handleFrontCoverUpload = async (e) => {
    try {
      console.log("Inside my method");
      const file = e.target.files[0];

      const blob = new Blob([file], { type: file.type });
      console.log(blob);
      const webpFile = await blobToWebP(blob);
      console.log("inside front cover input ");
      console.log(webpFile);
      let myfile;
      const base64 = new FileReader();
      base64.readAsDataURL(webpFile);
      base64.onload = () => {
        setImage(base64.result);
        myfile = base64.result;
        console.log(myfile);
      };
      base64.onerror = (error) => {
        console.log("Error: ", error);
      };
    } catch (error) {
      console.log(error.message + "error cought in hanlde upload");
    }
  };

  //   ------------------------------
  // const getBookFile = async (e) => {
  //   const book = e.target.files[0];
  //   setFileSize(book.size);
  //   setSelectedFile(book);
  // };

  const getBookFileUrdu = async (e) => {
    const book = e.target.files[0];
    setSelectedFileUrdu(book);
  };

  let set1stpagelink = "";
  let set2ndpagelink = "";
  let set3rdpagelink = "";
  let set4thpagelink = "";
  let set5thpagelink = "";

  const handle1stPage = async () => {
    const page = get1stPage;
    try {
      const mycoverfile = page;
      if (title) {
        const storageRef = await ref(storage, `${title}/${mycoverfile.name}`);
        await uploadBytes(storageRef, mycoverfile).then((snapshot) => {
          console.log(snapshot);
        });
        const rul = await getDownloadURL(storageRef);

        set1stpagelink = rul;
        // set1stPage(rul);
        console.log(set1stpagelink);
      } else {
        toast.error("please enter title");
      }
    } catch (error) {
      console.log(error.message + " error cought in hanlde upload");
    }
  };

  const handle2ndPage = async () => {
    const page = get2ndPage;
    try {
      const mycoverfile = page;
      if (title) {
        const storageRef = await ref(storage, `${title}/${mycoverfile.name}`);
        await uploadBytes(storageRef, mycoverfile).then((snapshot) => {
          console.log(snapshot);
        });
        const rul = await getDownloadURL(storageRef);

        set2ndpagelink = rul;
        // set1stPage(rul);
        console.log(set2ndpagelink);
        setmy2ndbooklink(set2ndpagelink);
      } else {
        toast.error("please enter title");
      }
    } catch (error) {
      console.log(error.message + " error cought in hanlde upload");
    }
  };

  const handle3rdPage = async () => {
    const page = get3rdPage;
    try {
      const mycoverfile = page;
      if (title) {
        const storageRef = await ref(storage, `${title}/${mycoverfile.name}`);
        await uploadBytes(storageRef, mycoverfile).then((snapshot) => {
          console.log(snapshot);
        });
        const rul = await getDownloadURL(storageRef);

        set3rdpagelink = rul;
        // set1stPage(rul);
        console.log(set3rdpagelink);
      } else {
        toast.error("please enter title");
      }
    } catch (error) {
      console.log(error.message + " error cought in hanlde upload");
    }
  };

  const handle4thPage = async () => {
    const page = get4thPage;
    try {
      const mycoverfile = page;
      if (title) {
        const storageRef = await ref(storage, `${title}/${mycoverfile.name}`);
        await uploadBytes(storageRef, mycoverfile).then((snapshot) => {
          console.log(snapshot);
        });
        const rul = await getDownloadURL(storageRef);

        set4thpagelink = rul;
        // set1stPage(rul);
        console.log(set4thpagelink);
      } else {
        toast.error("please enter title");
      }
    } catch (error) {
      console.log(error.message + " error cought in hanlde upload");
    }
  };

  const handle5thPage = async () => {
    const page = get5thPage;
    try {
      const mycoverfile = page;
      if (title) {
        const storageRef = await ref(storage, `${title}/${mycoverfile.name}`);
        await uploadBytes(storageRef, mycoverfile).then((snapshot) => {
          console.log(snapshot);
        });
        const rul = await getDownloadURL(storageRef);

        set5thpagelink = rul;
        // set1stPage(rul);
        console.log(set5thpagelink);
      } else {
        toast.error("please enter title");
      }
    } catch (error) {
      console.log(error.message + " error cought in hanlde upload");
    }
  };

  const handleUploadBook = async () => {
    try {
      setDisabledBtn(true);
      await handle1stPage();
      await handle2ndPage();
      await handle3rdPage();
      await handle4thPage();
      await handle5thPage();
      setLoading(true);
      setStock(stock ? stock : 10);
      try {
        const bookdata = {
          title: title,
          publisher: publisher,
          isbn10: isbn10,
          isbn13: isbn13,
          asinNumber: asin,
          ebookPrice: ebookPrice,
          urduPrice: urduPrice,
          author: author,
          noOfPages: noOfPages,
          format: format,
          description: description,
          coverPage: image,
          book1stpage: set1stpagelink,
          book2ndpage: my2ndbooklink,
          book3rdpage: set3rdpagelink,
          book4thpage: set4thpagelink,
          book5thpage: set5thpagelink,
          otherCoverPages: "nothing",
          category: category,
          price: paperbookPrice,
          stock: stock,
          publishingDate: publishingDate,
          language: lang,
          dimension: `${height ? height : 0} x ${width ? width : 0} x ${
            length ? length : 0
          }`,
          weight: weight ? weight : 0,
          fileSize: fileSize ? fileSize : 0,
        };

        console.log("before form data azios requirest");
        console.log(bookdata);
        const resp = await axios.post(`${server}/books/new`, bookdata, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(resp.data);
        console.log(bookdata);
        // if (urdu) {
        //   const formData2 = new FormData();
        //   formData2.append("file", selectedFileUrdu);
        //   formData2.append("bookId", resp.data.book._id);

        //   const resp2 = await axios.post(
        //     `${server}/books/new/urdu`,
        //     formData2,
        //     { headers: { "Content-Type": "multipart/form-data" } }
        //   );

        //   console.log(resp2.data);
        // }

        toast.success(resp.data.message);
        setLoading(false);
        // handleReset();
      } catch (err) {
        console.log(err.message);
        toast.error(err.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col py-2 pl-6 my-2 ml-6">
          <div className="text-xl font-bold">
            <h1> {"1."} &nbsp;&nbsp; ADD BOOK</h1>
          </div>
          <div className="p-4 mx-4 my-2 border border-slate-300 rounded-xl">
            <h1 className="p-2 text-2xl font-bold border-b border-slate-400">
              Book details form
            </h1>
            <div className="flex flex-col gap-4 p-4">
              <div
                className={`flex flex-col gap-4 p-4 ${
                  showState ? "block" : "hidden"
                }`}
              >
                {/* Title of book */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">Title</label>
                  <input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="title"
                    id="title"
                  />
                </div>

                {/* Author name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="author">Author name</label>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="author name"
                    id="author"
                  />
                </div>

                {/* Description for book */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="description">Description</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="description"
                    id="description"
                  />
                </div>

                {/* Publisher name  */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="publisher">Publisher name</label>
                  <input
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="publishser"
                    id="publisher"
                  />
                </div>

                {/* ISBN 10 number */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="isbn10">ISBN number</label>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <input
                      value={isbn10}
                      onChange={(e) => setIsbn10(e.target.value)}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="text"
                      name="isbn10"
                      id="isbn10"
                      placeholder="ISBN 10"
                    />

                    <input
                      value={isbn13}
                      onChange={(e) => setIsbn13(e.target.value)}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="text"
                      name="isbn13"
                      id="isbn13"
                      placeholder="ISBN 13"
                    />
                  </div>
                </div>

                {/* Category of book */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="category">Category</label>
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    id="category"
                  />
                </div>

                {/* No of pages of book */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="noOfPages">No Of Pages</label>
                  <input
                    value={noOfPages}
                    onChange={(e) => setNoOfPages(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="number"
                    name="noOfPages"
                    id="noOfPages"
                  />
                </div>

                {/* Language */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="language">Language</label>

                  <div className="flex gap-4">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="lang" onClick={handleEnglish} />
                      <p>English</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="lang" onClick={handleUrdu} />
                      <p>Urdu</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="lang" onClick={handleLang} />
                      <p>Both</p>
                    </div>
                  </div>
                </div>

                {/* format */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="stock">Fomat</label>

                  <div className="flex gap-4">
                    <div className={`flex gap-4 items-center`}>
                      <input type="radio" name="format" onClick={handleEbook} />
                      <p>E-book</p>
                    </div>
                    <div className={`flex gap-4 items-center`}>
                      <input
                        type="radio"
                        name="format"
                        onClick={handlePaperbook}
                      />
                      <p>Paperbook</p>
                    </div>
                    <div className={`flex gap-4 items-center`}>
                      <input
                        type="radio"
                        name="format"
                        onClick={handleFormat}
                      />
                      <p>Both</p>
                    </div>
                  </div>
                </div>

                {/* Price of book */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="price">Price</label>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <input
                      value={ebookPrice}
                      onChange={(e) => setEbookPrice(e.target.value)}
                      className={`${
                        ebook ? "block" : "hidden"
                      } border outline-none border-slate-400 rounded-md px-2 py-1 focus:shadow focus:shadow-blue-400`}
                      type="text"
                      name="ebook-price"
                      id="ebook-price"
                      placeholder="E-book price"
                    />

                    <input
                      value={paperbookPrice}
                      onChange={(e) => setPaperbookPrice(e.target.value)}
                      className={`${
                        paperbook ? "block" : "hidden"
                      } border outline-none border-slate-400 rounded-md px-2 py-1 focus:shadow focus:shadow-blue-400`}
                      type="text"
                      name="paperbook-price"
                      id="paperbook-price"
                      placeholder="Paperback Price"
                    />

                    <input
                      value={urduPrice}
                      onChange={(e) => setUrduPrice(e.target.value)}
                      className={`${paperbook ? "block" : "hidden"} ${
                        urdu || lang === "both" ? "block" : "hidden"
                      } border outline-none border-slate-400 rounded-md px-2 py-1 focus:shadow focus:shadow-blue-400`}
                      type="text"
                      name="urdu-price"
                      id="urdu-price"
                      placeholder="Urdu Version price"
                    />
                  </div>
                </div>

                {/* stock for paperbook */}
                <div
                  className={`${
                    paperbook ? "block" : "hidden"
                  } flex flex-col gap-1`}
                >
                  <label htmlFor="stock">Stock</label>
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="stock"
                    id="stock"
                  />
                </div>

                {/* Dimensions of book */}
                <div
                  className={`${
                    paperbook ? "block" : "hidden"
                  } flex flex-col gap-1`}
                >
                  <label htmlFor="dimension">Dimensions</label>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <input
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="text"
                      name="length"
                      id="length"
                      placeholder="Length"
                    />
                    <input
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="text"
                      name="width"
                      id="width"
                      placeholder="Width"
                    />
                    <input
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="text"
                      name="height"
                      id="height"
                      placeholder="Height"
                    />
                  </div>
                </div>

                {/* Weight */}
                <div
                  className={`${
                    paperbook ? "block" : "hidden"
                  } flex flex-col gap-1`}
                >
                  <label htmlFor="weight">Weight</label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="weight"
                    id="weight"
                    placeholder="Weight of book"
                  />
                </div>

                {/* ASIN */}
                <div
                  className={`${
                    ebook ? "block" : "hidden"
                  } flex flex-col gap-1`}
                >
                  <label htmlFor="weight">ASIN number</label>
                  <input
                    value={asin}
                    onChange={(e) => setAsin(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="text"
                    name="asin"
                    id="asin"
                    placeholder="ASIN number"
                  />
                </div>

                {/* publication date */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="publishingDate">Publication date</label>
                  <input
                    value={publishingDate}
                    onChange={(e) => setPublishingDate(e.target.value)}
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                    type="date"
                    name="publishingDate"
                    id="publishingDate"
                  />
                </div>
                {/* Cover page */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="">Book Covers</label>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="frontcover">Front Cover</label>
                      <input
                        value={coverPage}
                        onChange={(e) => {
                          // setCoverPage(e.target.value);
                          handleSubmit(e);
                        }}
                        placeholder="Front Cover"
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name="frontcover"
                        id="frontcover"
                      />
                    </div>
                    {/* <div className="flex flex-col gap-1">
                      <label htmlFor="othercovers">Back covers</label>
                      <input
                        multiple
                        value={coverPage}
                        onChange={(e) => {
                          // setCoverPage(e.target.value)
                          handleBackCoversSubmit(e);
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name="othercovers"
                        id="othercovers"
                        placeholder="Other images"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="">First 5 pages for preview</label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="">1st pages</label>
                      <input
                        multiple
                        // value={get1stPage}
                        onChange={(e) => {
                          set1stPage(e.target.files[0]);
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name=""
                        id=""
                        placeholder="Other images"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="">2nd pages</label>
                      <input
                        multiple
                        // value={get2ndPage}
                        onChange={(e) => {
                          set2ndPage(e.target.files[0]);
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name=""
                        id=""
                        placeholder="Other images"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="">3rd pages</label>
                      <input
                        // multiple
                        // value={get3rdPage}
                        onChange={(e) => {
                          set3rdPage(e.target.files[0]);
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name=""
                        id=""
                        placeholder="Other images"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="">4th pages</label>
                      <input
                        multiple
                        // value={get4thPage}
                        onChange={(e) => {
                          set4thPage(e.target.files[0]);
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name=""
                        id=""
                        placeholder="Other images"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="">5th pages</label>
                      <input
                        multiple
                        // value={get5thPage}
                        onChange={(e) => {
                          set5thPage(e.target.files[0]);
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="file"
                        name=""
                        id=""
                        placeholder="Other images"
                      />
                    </div>
                  </div>
                </div>
                {/* choose book file */}
                <div className="flex flex-col gap-4 md:flex-row">
                  {/* <div className="flex flex-col gap-1">
                    <label htmlFor="book">Upload book (English version) </label>
                    <input
                      value={bookFile}
                      onChange={(e) => {
                        setBookFile(e.target.value);
                        getBookFile(e);
                      }}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="file"
                      name="book"
                      id="book"
                    />
                  </div> */}
                  {/* <div
                    className={`flex flex-col gap-1 ${
                      urdu || lang === "both" ? "block" : "hidden"
                    }`}
                  >
                    <label htmlFor="urdubook">Upload book (Urdu version)</label>
                    <input
                      value={urduFile}
                      onChange={(e) => {
                        setUrduFile(e.target.value);
                        getBookFileUrdu(e);
                      }}
                      className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                      type="file"
                      name="urdubook"
                      id="urdubook"
                    />
                  </div> */}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={(e) => {
                      hanldePreviewBookDetails(e);
                    }}
                    className="px-2 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                  >
                    Preview Details
                  </button>
                  {/* <button
                    onClick={(e) => {
                      handleUploadUrduTest(e);
                    }}
                    className="px-2 py-1 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                  >
                    Upload urdu book
                  </button> */}
                </div>
              </div>
              <div
                className={`${
                  !showState ? "block" : "hidden"
                } flex flex-col gap-4`}
              >
                <div className="flex w-4/5 gap-2 p-2 border border-orange-400 rounded-lg bg-orange-50">
                  <div className="flex flex-col flex-wrap flex-1 gap-4 p-1">
                    <div className="flex flex-1 gap-4">
                      <div className="flex-[1]">
                        <img
                          className="w-44"
                          src={image}
                          alt="cover page image"
                        />
                      </div>
                      <div className="flex-[3]">
                        <h1 className="font-bold">{title}</h1>
                        <p className="flex gap-4">
                          <span className="font-bold"> by </span>
                          <span className="text-blue-400">{author}</span>
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Publishser Name:</span>{" "}
                          {publisher}{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Description:</span>{" "}
                          {description}{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Category:</span>
                          <span className="">{category} </span>
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Language:</span>
                          <span>
                            {lang === "both" ? "English, Urdu" : lang}{" "}
                          </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Format:</span>
                          <span>
                            {format === "both" ? "Ebook, Paperbook" : format}{" "}
                          </span>
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Dimension: </span>
                          <span>
                            {length} x {width} x {height} inches{" "}
                          </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Weight: </span>
                          <span>{width} ounces </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> ISBN-10: </span>
                          <span>{isbn10} </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> ISBN-13: </span>
                          <span>{isbn13} </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> ASIN: </span>
                          <span>{asin} </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Stock: </span>
                          <span>{stock} in stock</span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> No of pages: </span>
                          <span>{noOfPages} </span>{" "}
                        </p>
                        <p className="flex gap-4">
                          <span className="font-bold"> Price: </span>
                          <span className={ebook ? "block" : "hidden"}>
                            Ebook: ${ebookPrice}{" "}
                          </span>{" "}
                          <span className={ebook ? "block" : "hidden"}>
                            Paperbook: ${paperbookPrice}{" "}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <p className="flex justify-center">
                      <span
                        onClick={handleShowState}
                        className="text-blue-400 cursor-pointer hover:underline hover:text-red-400"
                      >
                        Edit details
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    disabled={disabledBtn}
                    onClick={handleUploadBook}
                    className="px-3 py-1 bg-yellow-500 rounded-md disabled:bg-gray-400 hover:bg-yellow-400"
                  >
                    Upload book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center px-3 py-1 m-4 text-white bg-yellow-600 border rounded-md border-slate-500">
          Page not found OR the page could be Protected
        </div>
      )}
    </>
  );
};

export default AddBook;
