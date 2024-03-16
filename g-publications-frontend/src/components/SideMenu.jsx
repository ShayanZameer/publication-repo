import React, { useContext } from "react";
import { Context } from "../main";
import { Link } from "react-router-dom";

const SideMenu = () => {
const {showSideMenu, setShowSideMenu} = useContext(Context)

const toggleSideMenu =  async () =>{
    await setShowSideMenu(false);
    window.history.back()
}

const toggleSideBar = async () =>{
    await setShowSideMenu(false);
}
    

  return (
    <div className={`fixed inset-0 w-full h-screen bg-white p-10`}>
      <div>
        <div>
          <button
          onClick={toggleSideMenu}
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
          <div className="flex flex-col gap-2">
            <Link onClick={toggleSideBar} to={"/"}>Home</Link>
            <a onClick={toggleSideMenu} href="/#contact-us">Contact Us</a>
            <Link onClick={toggleSideBar} to={"/about"}>About Us</Link>
            <Link onClick={toggleSideBar} to={"/login"}>Log In</Link>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
