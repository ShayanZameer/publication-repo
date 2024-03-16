import { Payment } from "../models/payment.js";
import { Book } from "../models/book.js";
import { transporter } from "../middlewares/mail.js";
import axios from "axios";

export const addPayment = async (req, res, next) => {
  try {
    const { name, email, phone, shippingAddress, bookId, amount } = req.body;
    const payment = await Payment.create({
      name,
      email,
      phone,
      shippingAddress,
      bookId,
      amount,
    });
    const subject = "Payment";
    const text = `A payment have been made for the book with id ${bookId}`;
    const mailOptions = {
      from: "muneebjutt026@gmail.com",
      to: "muneebjutt026@gmail.com", // Sending to yourself
      subject,
      text,
    };

    const book = await Book.findById(bookId);
    if (!book || !amount) throw new Error("Invalid book or invalid price");

    const info = await transporter.sendMail(mailOptions); 

    return res.status(201).json({
      success: true,
      message: "Payment added successfullly",
      payment,
      fileUrl: book.fileUrl,
      respon: info.response,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({
      success: false,
      message: "Payment cannot be added",
      err: error.message,
    });
  }
};

export const getToken = async (req, res) => {
  try {
    const {txnamt, basket_id} = req.body;
    const resp = await axios.post(
      "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken",
      { 
        merchant_id: 18883,
        secured_key: "GLe86WHNz1mcFb0bga3y7iuN",
        txnamt,
        basket_id,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        withCredentials: true,
      }
    );

    console.log(resp.data);
    res.status(200).json({
      message: "Token got successfully",
      success: true,
      tokenData: resp.data,
    });
  } catch (error) {
    console.log("error : " + error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const goToCheckOut = async (req, res) => {
//   try {
//     const { token, email, phone, order_date, item_desc } = req.body;
//     const resp = await axios.post(
//       "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction",
//       {
//         merchant_id: 18883,
//         currency_code: "PKR",
//         txnamt: 100,
//         basket_id: "item_101",
//         token,
//         success_url: "https://glorious-publications-frontend.vercel.app",
//         failure_url: "https://glorious-publications-frontend.vercel.app",
//         checkout_url:
//           "https://typedwebhook.tools/webhook/57510042-d8ef-4362-8bfb-ead0d6e15723",
//         customer_email_address: email,
//         customer_mobile_no: phone,
//         order_date,
//         signature: "randomSignature456",
//         version: "glorious_sales_001",
//         txndesc: item_desc,
//         proccode: "00",
//         tran_type: "ECOMM_PURCHASE",
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "Cache-Control": "no-cache",
//         },
//         withCredentials: true,
//       }
//     );

//     console.log(resp.data);
//     res.status(200).json({
//       message: "Payment successfull",
//       success: true,
//       response: resp.data,
//     });
//   } catch (error) {
//     console.log("error : " + error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const bsecureToken = async (req, res) => {
//   let config = {
//     client_id: "5b2cd276-47ec-4c50-bdca-f4ad50601e7a",
//     client_secret: "huHu+RRTNNCeXdecQVOXJ7UCdicUmvtVLKY/R4XLvVQ=",
//     environment: "production",
//   };

//   let token = await bSecure.authorize(config);
//   console.log(token);

//   res.status(200).json({
//     message: "Successfull extraction of token",
//     success: true,
//     tokenData: token,
//   });
// };
