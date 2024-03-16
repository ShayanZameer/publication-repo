import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "../main";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const credentials = {
        email,
        password,
      };
      const resp = await axios.post(
        `${server}/users/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(resp.data.message);
      setIsAuthenticated(true);
      
    } catch (error) {
      console.log(error);
      toast.error("Network error")
      setIsAuthenticated(false);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <>
      <div className="flex justify-center p-4">
        <div className="flex flex-col w-full gap-2 p-4 border rounded-md md:w-1/3 border-slate-300">
          <div className="flex justify-center border-b border-slate-400">
            <h1 className="pb-3 text-2xl font-bold">Sign In</h1>
          </div>
          <div className="flex">
            <form
              action=""
              className="flex flex-col w-full gap-4"
              onSubmit={(e) => handleLogin(e)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-bold">
                  <label htmlFor="password">Password</label>
                  <label htmlFor="">
                    {/* <a href="#" className="hover:text-blue-400"> */}
                      {/* <Link to="/password/forgot">Forgot you password?</Link> */}
                    {/* </a> */}
                  </label>
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="px-2 py-1 border rounded-md outline-none border-slate-400 focus:shadow focus:shadow-blue-400"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-yellow-500 rounded-md hover:bg-yellow-400"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
