import axios from "axios";
import React, { useEffect } from "react";
import { server } from "../main";

const TestFrom = () => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  console.log(customer);
  const handleSubmit = async () => {
    const orderData = await axios.post(`${server}/order/new`, {
      customerName: customer.userName,
      mail: customer.email,
      phone: customer.phone,
      transactionAmount: customer.totalPrice,
      bookLink: `https://glorious-publications-frontend.vercel.app/${customer.bookId}`,
      bookTitle: customer.bookTitle,
    });

    localStorage.setItem(JSON.stringify({ ...orderData }));
    setTimeout(() => {
      localStorage.removeItem("customer");
    }, 2000);
  };

  useEffect(() => {
    // handleSubmit();
  }, []);

  return (
    <>
      <div className="flex p-4 m-10">
        <form
          onSubmit={handleSubmit}
          id="PayFast_payment_form"
          name="PayFast-payment-form"
          method="post"
          action="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction"
          className="flex flex-col w-full gap-4 "
        >
          <div className="flex gap-4 ">
            Currency Code:
            <input
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
              type="TEXT"
              name="CURRENCY_CODE"
              placeholder="PKR"
              value={"PKR"}
              readOnly
            />
          </div>
          <div className="flex gap-4 ">
            Merchant ID:
            <input
              type="TEXT"
              name="MERCHANT_ID"
              placeholder="18883"
              value={`18883`}
              readOnly
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Token:
            <input
              type="TEXT"
              name="TOKEN"
              placeholder={customer.token}
              value={customer.token}
              readOnly
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Success URL:
            <input
              type="TEXT"
              name="SUCCESS_URL"
              placeholder="http://merchant-site-example.com"
              value={`https://glorious-publications-frontend.vercel.app/download/${customer.bookId}/`}
              readOnly
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Failure URL:
            <input
              type="TEXT"
              name="FAILURE_URL"
              placeholder="http://merchant-site-example.com"
              value={"https://glorious-publications-frontend.vercel.app/"}
              readOnly
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Checkout URL:
            <input
              type="TEXT"
              name="CHECKOUT_URL"
              value={
                "https://typedwebhook.tools/webhook/57510042-d8ef-4362-8bfb-ead0d6e15723"
              }
              readOnly
              placeholder="https://typedwebhook.tools/webhook/57510042-d8ef-4362-8bfb-ead0d6e15723"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Customer Email:
            <input
              type="TEXT"
              name="CUSTOMER_EMAIL_ADDRESS"
              value={`${customer.email}`}
              readOnly
              placeholder="some-email@example.com"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Customer Mobile:
            <input
              type="TEXT"
              name="CUSTOMER_MOBILE_NO"
              value={`${customer.phone}`}
              readOnly
              placeholder={`mobile 000000000`}
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Transaction Amount:
            <input
              type="TEXT"
              value={`${customer.totalPrice}`}
              readOnly
              name="TXNAMT"
              placeholder=""
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Basket ID:
            <input
              type="TEXT"
              value={customer.bookId}
              readOnly
              name="BASKET_ID"
              placeholder=""
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Transaction Date:
            <input
              type="TEXT"
              name="ORDER_DATE"
              value={`${new Date(Date.now()).toLocaleDateString()}`}
              readOnly
              placeholder=""
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Signature:
            <input
              type="TEXT"
              value={"SOME-RANDOM-STRING"}
              readOnly
              name="SIGNATURE"
              placeholder="SOME-RANDOM-STRING"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4">
            Version:
            <input
              type="TEXT"
              name="VERSION"
              value={"MERCHANT-CART-0.1"}
              readOnly
              placeholder="MERCHANT-CART-0.1"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Item Description:
            <input
              type="TEXT"
              name="TXNDESC"
              value={`${customer.desc}`}
              readOnly
              placeholder="Item Purchased from Cart"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Proccode:
            <input
              type="TEXT"
              value={"00"}
              readOnly
              name="PROCCODE"
              placeholder="00"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div className="flex gap-4 ">
            Transaction Type:
            <input
              type="TEXT"
              name="TRAN_TYPE"
              placeholder="ECOMM_PURCHASE"
              value={"ECOMM_PURCHASE"}
              readOnly
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400"
            />
          </div>
          <div>
            <input
              type="SUBMIT"
              placeholder="SUBMIT"
              className="w-3/5 px-2 py-1 border rounded-md border-slate-400 hover:bg-yellow-400"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default TestFrom;
