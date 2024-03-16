import React, { useEffect, useState } from "react";
import CreditCard from "../components/CreditCard";
import { toast } from "react-hot-toast";
import cover from "../assets/cover.jpg";
import axios from "axios";
import { server } from "../main";

const Payment = () => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");

  const [btnState, setBtnState] = useState(false);

  const [showState, setShowState] = useState(true);

  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPriceWithoutTax, setTotalPriceWithoutTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [impotPrice, setImportPrice] = useState(0);



  const curbook = sessionStorage.getItem("currentBook")
    ? JSON.parse(sessionStorage.getItem("currentBook"))
    : null;

  const handlePrice = () => {
    const bookPrice = curbook ? curbook.price : 0;
    setTotalPriceWithoutTax(shippingPrice + bookPrice);
    setTotalPrice(totalPriceWithoutTax + taxPrice + impotPrice);
  };

  const handleShowState = () => {
    setShowState(!showState);
  };
  const hanldeSubmitShippingAddress = () => {
    if (country && name && email && phone && province && zip && streetAddress) {
      handleShowState();
    } else {
      toast.error("Fill all fields first");
    }
  };

  const handlePayment = async () => {
    if (country && name && email && phone && province && zip && streetAddress) {
      setBtnState(true);
      const data = {
        name,
        email,
        bookId: curbook._id,
        phone,
        amount: totalPrice,
        shippingAddress: streetAddress + building,
      };
      const resp = await axios.post(`${server}/payment/new`, data, {
        headers:{
          "Content-Type":"application/json"
        }
      });

      console.log(resp.data);
      toast.success(resp.data.message);
    } else {
      toast.error("Fill all fields first");
    }
    toast.success("Place order button clicked");
  };

  useEffect(() => {
    handlePrice();
  }, []);

  return (
    <>
      <div onLoad={handlePrice} className="">
        <div className="flex justify-center p-4 mx-4 head bg-slate-100">
          <h1>
            Checkout
            <span className="text-blue-400"> ( 1 Item )</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="left flex-[5]">
            <div className="flex flex-col py-2 pl-6 my-2 ml-6">
              <div className="text-xl font-semibold">
                <h1>1 &nbsp;&nbsp; Choose a shipping address</h1>
              </div>
              <div className="p-4 mx-4 my-2 border border-slate-300 rounded-xl">
                <h1 className="p-2 text-2xl font-bold border-b border-slate-400">
                  Your Address
                </h1>
                <div className="flex flex-col gap-4 p-4">
                  <div
                    className={`flex flex-col gap-4 p-4 ${
                      showState ? "block" : "hidden"
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <label htmlFor="country">Country/Region</label>
                      <input
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          handlePrice();
                        }}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="text"
                        name="country"
                        id="country"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="customername">
                        Full name ( First and Last name )
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="text"
                        name="customername"
                        id="customername"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="email">Email in use</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="text"
                        name="email"
                        id="email"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="phone">Phone number</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="number"
                      />
                      <p className="text-xs">May be used to assist</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="address">Address</label>
                      <input
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="text"
                        name="street address"
                        id="address"
                        placeholder="Street address or P.O.Box"
                      />
                      <input
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="text"
                        name="building"
                        placeholder="Apt, suite, unite, building, floor, etc."
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="">Stete / Province / Region</label>
                      <input
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="">Zip code</label>
                      <input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                        type="number"
                        name=""
                        id=""
                      />
                    </div>

                    <div>
                      <button
                        onClick={hanldeSubmitShippingAddress}
                        className="px-2 py-1 bg-yellow-500 rounded-lg"
                      >
                        Use this address
                      </button>
                    </div>
                  </div>
                  <div className={`${!showState ? "block" : "hidden"} flex`}>
                    <div className="flex gap-2 p-2 border border-orange-200 rounded-lg bg-orange-50">
                      <input type="radio" name="" id="" checked />
                      <div className="flex flex-wrap gap-1 p-1">
                        <p>
                          <span className="font-semibold">{name}</span>{" "}
                          {building}, {streetAddress}, {province}, {zip},{" "}
                          {country}.
                          <span
                            onClick={handleShowState}
                            className="text-blue-400 cursor-pointer hover:underline hover:text-red-400"
                          >
                            Edit address
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="credit-card-form">
              <CreditCard count={2} />
            </div>
            <div className="checkout">
              <div className="flex flex-col p-4 m-4">
                <div className="text-xl font-semibold">
                  <h1>3 &nbsp; Review items and shipping</h1>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col p-6 mx-4 my-2 border border-slate-300 rounded-xl">
                    <div className="flex flex-col gap-2 p-2">
                      <h1 className="text-xl font-bold text-green-700">
                        Delivery: date here
                      </h1>
                      <p className="text-sm">
                        Items shipped from Glorious publications
                      </p>
                    </div>
                    <div className="flex gap-4 p-4">
                      <div className="flex flex-1 gap-4 left">
                        <div className="imgdiv">
                          <img className="w-28" src={cover} alt="" />
                        </div>
                        <div className="detdiv">
                          <h1 className="font-semibold">{curbook.title}</h1>
                          <p className="text-xs">
                            by <span>{curbook.author} </span>
                          </p>
                          <p className="font-bold text-amber-700">
                            $ {curbook ? curbook.price : "N/A"}.00
                          </p>
                          <p>Qty: 1</p>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 gap-2 right">
                        <h1 className="font-semibold">
                          Choose delivery option
                        </h1>
                        <div className="flex gap-2 p-2">
                          <div className="flex items-start p-2">
                            <input
                              type="radio"
                              className=""
                              name="deleviry"
                              id="normal-delivery"
                              defaultChecked
                            />
                          </div>
                          <div>
                            <p className="font-bold text-green-700">
                              Friday, Aug. 25
                            </p>
                            <p className="text-sm ">
                              $ {shippingPrice} - Standard International
                              Shipping
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 p-2">
                          <div className="items-start p-2 flax">
                            <input
                              type="radio"
                              className="mb-auto"
                              name="deleviry"
                              id="fast-delivery"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-green-700">
                              Friday, Aug. 15
                            </p>
                            <p className="text-sm">
                              $ {shippingPrice} - Priority shipping
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 mx-4 my-2 border border-slate-300 rounded-xl">
                    <div className="flex items-center justify-center">
                      <button
                      disabled={btnState}
                        onClick={handlePayment}
                        className="px-2 py-1 bg-yellow-400 rounded-md disabled:bg-gray-400 hover:bg-yellow-500"
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
          <div className="right flex-[2]">
            <div className="p-4">
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-slate-400">
                <h1 className="flex text-2xl font-semibold">Order summery</h1>
                <div className="flex flex-col w-full gap-2 p-3 mt-2 text-xs">
                  <div className="flex gap-4">
                    <p className="flex-[2]">Items:</p>
                    <p className="flex items-center justify-end flex-1 w-3/4">
                      USD {curbook ? curbook.price : "N/A"}
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
                      Estimated tex to be <br /> collected:
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

export default Payment;
