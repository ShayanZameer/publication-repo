import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreditCard = ({count}) => {
  const [showCardForm, setShowCardForm] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cvc, setCVC] = useState("");

  const toggleShowCardFrom = (e) => {
    setShowCardForm(!showCardForm);
  };

  const handleCardInfo = (e) => {
    e.preventDefault();

    if(cardNumber && expiry && cardHolderName && cvc){
        toggleShowCardFrom();
    }else{
        toast.error("Card details are incomplete! Fill them first");
    }
  };
  return (
    <div className="flex flex-col p-4 m-4">
      <div className="text-xl font-semibold">
        <h1>{count} &nbsp; Choose a payment method</h1>
      </div>
      <div className="flex flex-col gap-4 p-4 mx-4 my-2 border border-slate-300 rounded-xl">
        <div className="p-2 text-2xl font-bold border-b border-slate-400">
          <h1>Add a credit or debit card</h1>
        </div>
        <div className={`${showCardForm ? "block" : "hidden"}`}>
          <form
            action=""
            className="flex flex-col gap-4 "
            onSubmit={(e) => handleCardInfo(e)}
          >
            <div className="flex">
              <div className="flex flex-col flex-1 gap-2 left">
                <div className="flex items-center gap-1">
                  <label className="w-32" htmlFor="cardnumber">
                    Card number
                  </label>
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    id="cardnumber"
                    type="text"
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label className="w-32" htmlFor="cardholdername">
                    Name on card
                  </label>
                  <input
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    id="cardholdername"
                    type="text"
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label className="w-32" htmlFor="expiry">
                    Expiration date
                  </label>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label className="w-32" htmlFor="cvc">
                    CVC/CVV
                  </label>
                  <input
                    value={cvc}
                    onChange={(e) => setCVC(e.target.value)}
                    id="cvc"
                    type="number"
                    className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 p-3 border-t border-slate-400">
              <button
                type="reset"
                className="px-2 py-1 border rounded-md border-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 bg-yellow-400 border rounded-md border-slate-500 hover:bg-yellow-500"
                type="submit"
              >
                Confirm details
              </button>
            </div>
          </form>
        </div>
        <div className={`${showCardForm ? "hidden" : "block"} p-4`}>
          <div className="flex gap-2 p-2 bg-orange-100 border border-orange-200 rounded-lg">
            <input type="radio" name="" id="" className="flex" checked />
            <p>
              <i className="fa-regular fa-credit-card"></i>
            </p>
            <div className="flex gap-6">
              <p>
                <span className="font-bold">Card </span> ending in
                {cardNumber.slice(cardNumber.length - 4)}
              </p>
              <p>{cardHolderName}</p>
              <p>{expiry}</p>
              <p
                onClick={toggleShowCardFrom}
                className="text-blue-400 cursor-pointer hover:underline hover:text-red-400"
              >
                Change card
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
