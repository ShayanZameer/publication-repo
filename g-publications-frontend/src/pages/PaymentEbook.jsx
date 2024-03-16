import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";

const PaymentEbook = () => {
  const navigate = useNavigate();

  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPriceWithoutTax, setTotalPriceWithoutTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [impotPrice, setImportPrice] = useState(0);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const [loading, setLoading] = useState(true);

  const [showCardForm, setShowCardForm] = useState(true);

  const curbook = sessionStorage.getItem("currentBook")
    ? JSON.parse(sessionStorage.getItem("currentBook"))
    : null;

  const handlePrice = () => {
    const bookPrice = curbook ? curbook.ebookPrice : 0;
    setTotalPriceWithoutTax(shippingPrice + bookPrice);
    setTotalPrice(totalPriceWithoutTax + taxPrice + impotPrice);
  };

  const handlePayment = async () => {
    if (userName && phone && email) {
      toast.success("Place order button clicked");
      const usdToPkr = await axios.get(
        `https://v6.exchangerate-api.com/v6/4cdb7ff87a83f9c87d74c4ac/pair/USD/PKR`
      );
      const pkrPrice = usdToPkr.conversion_rate * totalPrice;
      setFinalPrice(pkrPrice);
      const resp = await axios.post(`${server}/payment/token`, {
        txnamt: totalPrice,
        basket_id: `${curbook._id}`,
      });
      console.log(curbook._id);
      const tokenData = resp.data.tokenData;
      let obj = {
        token: tokenData.ACCESS_TOKEN,
        userName,
        email,
        phone,
        totalPrice,
        desc: curbook.description,
        bookTitle: curbook.title,
        bookId: curbook._id,
      };
      localStorage.setItem("customer", JSON.stringify(obj));
      navigate("/testform");
    } else {
      toast.error("User details are incomplete");
    }
  };

  const toggleShowCardFrom = (e) => {
    setShowCardForm(!showCardForm);
  };

  const handleCardInfo = (e) => {
    e.preventDefault();

    if (userName && phone && email) {
      toggleShowCardFrom();
    } else {
      toast.error("User details are incomplete");
    }
  };

  useEffect(() => {
    handlePrice();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <Loader /> : ""}
      <div onLoad={handlePrice} className={`${loading ? "hidden" : "block"}`}>
        <div className="flex gap-2 max-sm:flex-col">
          <div className="left flex-[5]">
            <div className="flex flex-col p-4 m-4">
              <div className="text-xl font-semibold">
                <h1>1. Customer details</h1>
              </div>
              <div className="flex flex-col gap-4 p-4 mx-4 my-4 border credit-card-form border-slate-300 rounded-xl">
                <div className="p-2 text-2xl font-bold border-b border-slate-400">
                  <h1>Fill the form below</h1>
                </div>
                <div className="">
                  <form
                    action=""
                    className="flex flex-col gap-4"
                    onSubmit={(e) => handleCardInfo(e)}
                  >
                    <div className="flex">
                      <div className="flex flex-col flex-1 gap-2 left">
                        <div className="flex items-center gap-1">
                          <label className="w-32" htmlFor="username">
                            Name
                          </label>
                          <input
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            id="username"
                            type="text"
                            className="w-3/5 px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <label className="w-32" htmlFor="email">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            className="w-3/5 px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <label className="w-32" htmlFor="phone">
                            Mobile No
                          </label>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            type="text"
                            placeholder=""
                            className="w-3/5 px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="checkout">
              <div className="flex flex-col p-4 m-4">
                <div className="text-xl font-semibold">
                  <h1>2 &nbsp; Review Order</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col p-6 mx-4 my-2 border border-slate-300 rounded-xl">
                    <div className="flex flex-col gap-2 p-2">
                      <h1 className="text-xl font-bold text-green-700">
                        Delivery: Instantly
                      </h1>
                      <p className="text-sm">
                        Items shipped from Glorious publications
                      </p>
                    </div>
                    <div className="flex gap-4 p-4">
                      <div className="flex flex-1 gap-4 left">
                        <div className="imgdiv">
                          <img
                            className="w-28"
                            src={curbook.coverPage}
                            alt=""
                          />
                        </div>
                        <div className="detdiv">
                          <h1 className="font-semibold">{curbook.title}</h1>
                          <p className="text-xs">
                            by <span>{curbook.author} </span>
                          </p>
                          <p className="font-bold text-amber-700">
                            $ {curbook ? curbook.ebookPrice : "N/A"}.00
                          </p>
                          <p>Qty: 1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full gap-4 p-4 mx-4 my-2 border sm:hidden border-slate-300 rounded-xl">
                    <div className="flex w-full">
                      <div className="flex flex-col items-center justify-center w-full p-4">
                        <h1 className="flex text-2xl font-semibold">
                          Order summery
                        </h1>
                        <div className="flex flex-col w-full gap-2 p-3 mt-2 text-xs">
                          <div className="flex gap-4">
                            <p className="flex-[2]">Items:</p>
                            <p className="flex items-center justify-end flex-1 w-3/4">
                              USD {curbook ? curbook.ebookPrice : "N/A"}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <p className="flex-[2]">Shipping and handling</p>
                            <p className="flex items-center justify-end flex-1 w-3/4 pb-2 border-b border-slate-400">
                              USD {shippingPrice} 
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <p className="flex-[2]">Total before tax:</p>
                            <p className="flex items-center justify-end flex-1 w-3/4">
                              USD {totalPriceWithoutTax}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <p className="flex-[2]">
                              Estimated tax to be <br /> collected:
                            </p>
                            <p className="flex items-center justify-end flex-1 w-3/4">
                              USD {taxPrice}
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <p className="flex-[2]">Import fee Deposite:</p>
                            <p className="flex items-center justify-end flex-1 w-3/4">
                              USD {impotPrice}
                            </p>
                          </div>
                          <div className="flex p-2 text-lg font-bold total border-y border-slate-400 text-amber-700">
                            <p className="flex-[2]">Order total:</p>
                            <p className="flex-[2] flex justify-end">
                              USD ${totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 mx-4 my-2 border border-slate-300 rounded-xl">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={handlePayment}
                        className="px-2 py-1 bg-yellow-400 rounded-md hover:bg-yellow-500"
                      >
                        Place your order now
                      </button>
                    </div>
                    <div className="">
                      <h1 className="text-lg font-bold text-amber-700">
                        Payment Total: $ {totalPrice}
                      </h1>
                      <p className="my-1 text-xs ">
                        By placing order you agree to our
                        <span className="text-blue-400 cursor-pointer hover:text-red-500">
                          privacy notice
                        </span>
                      </p>
                      <p className="my-2 text-xs">
                        You also agree to our
                        <span className="text-blue-400 cursor-pointer hover:text-red-500">
                          terms and conditions
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right max-sm:hidden flex-[2]">
            <div className="p-4">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-slate-400">
                <h1 className="flex text-2xl font-semibold">Order summery</h1>
                <div className="flex flex-col w-full gap-2 p-3 mt-2 text-xs">
                  <div className="flex gap-4">
                    <p className="flex-[2]">Items:</p>
                    <p className="flex items-center justify-end flex-1 w-3/4">
                      USD {curbook ? curbook.ebookPrice : "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className="flex-[2]">Shipping and handling</p>
                    <p className="flex items-center justify-end flex-1 w-3/4 pb-2 border-b border-slate-400">
                      USD {shippingPrice}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className="flex-[2]">Total before tex:</p>
                    <p className="flex items-center justify-end flex-1 w-3/4">
                      USD {totalPriceWithoutTax}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className="flex-[2]">
                      Estimated tax to be <br /> collected:
                    </p>
                    <p className="flex items-center justify-end flex-1 w-3/4">
                      USD {taxPrice}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p className="flex-[2]">Import fee Deposite:</p>
                    <p className="flex items-center justify-end flex-1 w-3/4">
                      USD {impotPrice}
                    </p>
                  </div>
                  <div className="flex p-2 text-lg font-bold total border-y border-slate-400 text-amber-700">
                    <p className="flex-[2]">Order total:</p>
                    <p className="flex-[2] flex justify-end">
                      USD ${totalPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentEbook;
