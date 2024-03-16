import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { server } from "../main";

const Footer = () => {
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [reportContent, setReortContent] = useState("");

  const handleReportAProblem = async () => {
    try {
      const data = {
        name: reporterName,
        email: reporterEmail,
        content: reportContent,
      };
      const resp = await axios.post(`${server}/report/new`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = resp.data;
      console.log(response);
      toast.success("Problem submitted successfully");
      setReortContent("");
      setReporterName("");
      setReporterEmail("");
    } catch (error) {
      console.log(error);
      toast.error("Cannot add problem");
    }
  };

  return (
    <>
      <div className="flex flex-col mt-8 text-white footer bg-slate-800">
        <div className="flex justify-center flex-1 gap-8 p-2 mt-8 max-sm:mx-4 sm:mx-10 md:mx-10 md:p-6 upper-footer">
          <div className="flex flex-1 gap-4 max-sm:justify-between">
            <div className="1st flex flex-[2] flex-col gap-6">
              <div className="heading">
                <h1 className="font-bold">Get to know us</h1>
              </div>
              <div className="flex flex-col gap-3 text-slate-300">
                {/* <Link to={"about"}>About Us</Link> */}
                {/* <a href="https://www.freeprivacypolicy.com/live/c9468759-c6e4-4586-b088-1315a989beec">Privacy policies</a> */}
                <a
                  href="https://www.privacypolicyonline.com/live.php?token=e41u9XiSEJA23NhktP6q0JM4QMwCOCF3"
                  target="_blank"
                >
                  Privacy policies
                </a>
                <a
                  href="https://www.privacypolicyonline.com/live.php?token=G81yk3FNeexQ1C4Xu00w5XDtl2SZm8FY"
                  target="_blank"
                >
                  Terms and conditions
                </a>
                <a
                  href="https://www.privacypolicies.com/live/b5d0aaee-e90c-4e01-9b2e-f6e9397cbaa3"
                  target="_blank"
                >
                  Refund policy
                </a>
                <a
                  href="https://www.privacypolicies.com/live/b5d0aaee-e90c-4e01-9b2e-f6e9397cbaa3"
                  target="_blank"
                >
                  Shipping policy
                </a>
                {/* <Link to={"about"}>About Author</Link> */}
              </div>
            </div>
            <div className="2nd flex flex-col gap-6 flex-[2] max-sm:ml-8">
              <div>
                <h1 id="contact-us" className="font-bold">
                  Contact Us
                </h1>
              </div>
              <div className="flex flex-col gap-3 text-slate-300">
                {/* <a
                  className="flex items-center gap-2"
                  href="https://www.facebook.com/muneebjutt.muneebjutt.121"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook"></i>Facebook
                </a>
                <a
                  className="flex items-center gap-2"
                  href="https://www.instagram.com/muneebjutt.muneebjutt.121/"
                  target="_blank"
                >
                  <i className="fa-brands fa-square-instagram"></i> Instagram
                </a> */}
                <a
                  className="flex items-center gap-2"
                  href="https://wa.me/923218544448"
                >
                  <i className="fa-solid fa-square-phone-flip"></i> Whatsapp
                </a>
                <a
                  className="flex items-center gap-2"
                  href="mailto:foxtelnetwork@hotmail.com"
                >
                  <i className="fa-solid fa-envelope"></i> Email
                </a>
                <p><i className="fa-solid fa-house"></i> House 267 street 22 E 7 islamabad </p>
              </div>
            </div>
          </div>

          <div className="flex flex-1 max-md:hidden">
            <div className="3rd flex flex-col gap-3 flex-[4] justify-center items-center ">
              <div className="flex flex-1 w-full">
                <h1 className="font-bold">Report a problem</h1>
              </div>
              <div className="flex flex-col flex-1 w-full gap-2 text-black">
                <input
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-10/12 p-2 rounded-md outline-none"
                  type="text"
                  name="name"
                  placeholder="Your name"
                />
                <input
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  className="w-10/12 p-2 rounded-md outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <textarea
                  value={reportContent}
                  onChange={(e) => setReortContent(e.target.value)}
                  className="w-10/12 p-2 rounded-md outline-none"
                  name="message"
                  id="message"
                  cols="30"
                  rows="5"
                  placeholder="Report you issue here"
                ></textarea>
                <button
                  onClick={handleReportAProblem}
                  className="w-10/12 p-2 text-white border border-white rounded-md btn hover:bg-slate-900"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t lower-footer border-slate-500">
          <div className="flex flex-col items-center p-4 ">
            {/* <a href="https://wa.me/923218544448" className="flex items-center flex-1 px-4">
            <i className="fa-brands fa-square-whatsapp"></i> &nbsp; &nbsp;
            <p>Whatsapp us: &nbsp;</p>
            <p>+92 321 8544448</p>
          </a>  */}
            <div className="flex flex-1">
              <p> &copy; 2023 All right reserved, &nbsp;</p>
              <p>Glorious Publications</p>
            </div>
            <div className="flex items-center flex-1 px-4">
              <div>
                <p>
                  Developed by &nbsp;
                  <a
                    href="https://www.linkedin.com/company/bytesight-technologies/"
                    className="text-blue-400 cursor-pointer hover:text-blue-500"
                  >
                    ByteSight Technologies
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
