import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import SideMenu from "./SideMenu";

const Header = () => {
  const [loc, setloc] = useState("");
  const { showSideMenu, setShowSideMenu } = useContext(Context);
  const {searchText, setSearchText} = useContext(Context);

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const getUserLoc = async () => {
    const res = await axios.get("https://ipinfo.io/json");
    const countryData = await axios.get(
      `https://restcountries.com/v3/alpha/${res.data.country}`
    );
    setloc(countryData.data[0].name.common);
  };

  const handleLogout = async () => {
    try {
      const resp = await axios.get(`${server}/users/logout`);

      let data = resp.data;
      if (data.success) {
        toast.success(data.message);
        setIsAuthenticated(false);
      } else {
        toast.error("Server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleBurger = () => {
    setShowSideMenu(!showSideMenu);
    navigate("/sideMenu");
  };

  return (
    <>
      <div
        className={`${
          showSideMenu ? "hidden" : ""
        } flex flex-col py-2 text-white bg-blue-950 nav`}
      >
        <div className="flex items-center h-16 upper-nav">
          <div className="left-nav flex max-sm:flex-[12] max-md:flex-[7] flex[3] gap-3 items-center pl-4">
            <div className="flex justify-center md:hidden">
              <div className="space-y-2" onClick={handleToggleBurger}>
                {showSideMenu ? (
                  <button
                    type="button"
                    class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span class="sr-only">Close menu</span>
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="w-7 h-0.5 bg-white"></div>
                    <div className="w-7 h-0.5 bg-white"></div>
                    <div className="w-7 h-0.5 bg-white"></div>
                  </div>
                )}
              </div>
            </div>
            <h1 className="flex items-center pl-2 sm:ml-3 sm:p-2 hover:border hover:border-white hover:rounded-sm">
              <Link to="/">
                <img className="w-10 h-10 rounded-2xl" src={logo} alt="" />
              </Link>
            </h1>
            <div className="md:hidden">
              <div className="text-3xl ">Glorious</div>
              <div className="m-[-4px] pl-1 tracking-widest">Publications</div>
            </div>
            <div className="flex items-center gap-2 p-1 max-md:hidden hover:border hover:border-white hover:rounded-sm">
              <i className="fa-solid fa-location-dot"></i>
              <h1 className="flex flex-col">
                Deliver to <span className="font-bold"> {loc} </span>
              </h1>
            </div>
          </div>
          <div className="mid-nav max-md:hidden flex flex-[6]">
            <div className="flex items-center w-11/12 bg-white rounded-md h-9 focus-within:border-2 focus-within:border-yellow-600">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search here"
                className="text-black flex items-center rounded-md p-1 outline-none flex-[4]"
              />
              <span className="text-black bg-yellow-400 rounded-e-md hover:bg-yellow-500 hover:cursor-pointer flex items-center px-4 h-full flex[1]">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
          <div className="right-nav flex flex-[5] md:flex-[4]">
            <div className="flex w-full gap-3 max-md:flex-1 max-md:justify-end max-md:px-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="p-2 hover:border hover:border-white hover:rounded-sm"
                >
                  Log out
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="p-2 hover:border hover:border-white hover:rounded-sm"
                >
                  Log in
                </Link>
              )}
              {/* <Link
                to={"/about"}
                className="p-2 hover:border hover:border-white hover:rounded-sm"
              >
                About
              </Link> */}
              {isAuthenticated ? (
                <Link
                  to={"/addbook"}
                  className="p-2 hover:border hover:border-white hover:rounded-sm"
                >
                  Add Book
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full lower-nav">
          <div className="flex flex-1 px-3 md:hidden">
            <div className="flex items-center flex-1 bg-white rounded-md h-9 focus-within:border-2 focus-within:border-yellow-600">
              <input
              value={searchText}
                type="text"
                onChange={(e) =>setSearchText(e.target.value)}
                placeholder="Search here"
                className="flex items-center p-1 text-black rounded-md outline-none flex-[7]"
              />
              <span className="flex items-center justify-center flex-1 h-full text-black bg-yellow-400 rounded-e-md hover:bg-yellow-500 hover:cursor-pointer">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
