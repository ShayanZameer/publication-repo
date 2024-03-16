import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";

export const Context = createContext({ isAuthenticated: false });
export const server = "https://glorious-publications.onrender.com/api/v1";
// export const server = "http://localhost:4000/api/v1";

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState({});
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        allBooks,
        setAllBooks,
        currentBook,
        setCurrentBook,
        showSideMenu, 
        setShowSideMenu,
        searchText, 
        setSearchText,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
