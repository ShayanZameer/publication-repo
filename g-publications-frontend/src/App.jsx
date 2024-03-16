import { useContext, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import BookDetails from "./pages/BookDetails";
import Payment from "./pages/Payment";
import PaymentEbook from "./pages/PaymentEbook";
import ForgotPassword from "./pages/ForgotPassword";
import AddBook from "./pages/AddBook";
import TestFrom from "./pages/TestFrom";
import ShippingInfo from "./pages/ShippingInfo";
import DownloadBook from "./pages/DownloadBook";
import SideMenu from "./components/SideMenu";
import { Context } from "./main";

function App() {
  const [image, setImage] = useState("");
  const handleSubmit = async (e) => {
    await handleUpload(e);
    console.log("inside submit handler : ", image);
  };

  const handleUpload = async (e) => {
    const fils = e.target.files;
    console.log(fils);
    const file = e.target.files[0];
    let myfile;
    const base64 = new FileReader();
    base64.readAsDataURL(file);
    base64.onload = () => {
      setImage(base64.result);
      myfile = base64.result;
    };
    base64.onerror = (error) => {
      console.log("Error: ", error);
    };

    base64.onloadend = () => {
      console.log("not inside");
      // console.log(image);
      console.log(myfile);
      setImage(myfile);
      console.log("going outside");
    };
  };

  const handleresp = async () => {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/files/64c47ea409e4067ec93fb480"
    );
    console.log("response data", data);
  };

  const {showSideMenu} = useContext(Context)

  return (
    <>
    
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/ebook" element={<PaymentEbook />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/testform" element={<TestFrom />} />
          <Route path="/shipping-policy" element={<ShippingInfo />} />
          <Route path="/download" element={<DownloadBook />} />
          <Route path="/sideMenu" element={<SideMenu />} />
        </Routes>
        <Toaster /> 
        <Footer />
      </Router>
      
    </>
  );
}

export default App;
