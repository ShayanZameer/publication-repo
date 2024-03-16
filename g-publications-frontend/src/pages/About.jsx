import React, { useContext } from "react";
import author from "../assets/author.jpeg";
import cover from "../assets/cover.jpg";
import { Context } from "../main";
import { Link } from "react-router-dom";

const About = () => {
  const { currentBook, allBooks, setCurrentBook } = useContext(Context);

  return (
    <>
      <div className="flex p-8">
        <div className="px-20">
          <div className="flex justify-center p-4 mb-10">
            <h1 className="text-2xl font-bold">ABOUT THE AUTHOR</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex flex-col justify-center gap-4">
                <img src={author} alt="author img" className="rounded-lg" />
                <h1 className="flex justify-center font-bold">
                  Mr. Suroosh Najmi
                </h1>
              </div>
              <div className="">
                <p>
                  Author details Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Placeat culpa corrupti accusamus repellat
                  totam, nam iusto, eligendi alias labore ad tempora ipsam
                  quibusdam voluptatum nostrum fugit temporibus quisquam rerum
                  veniam officia magnam.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center max-md:gap-4">
              <h1 className="px-4 py-2 text-white bg-gray-500 rounded-md cursor-default">
                Top publications
              </h1>
              <div className="flex flex-col gap-8 md:gap-4">
                <p className="flex justify-end text-blue-400 underline cursor-pointer max-md:justify-center hover:no-underline"> <Link to={"/"}> View all  </Link> </p>
                <div className="flex flex-wrap gap-4">
                  {/* <Link to={`/`}> */}
                  <img src={cover} width="170px" height="200px" alt="" className="cursor-pointer" />
                  {/* </Link> */}
                  {/* <Link to={`/`}> */}
                  <img src={cover} alt="" width="170px" height="200px" className="cursor-pointer" />
                  {/* </Link> */}
                  {/* <Link to={`/`}> */}
                  <img src={cover} alt="" width="170px" height="200px" className="cursor-pointer" />
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
