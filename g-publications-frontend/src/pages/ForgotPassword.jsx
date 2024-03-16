import React from 'react'

const ForgotPassword = () => {
  return (
    <>
    <div className="flex justify-center p-4">
        <div className="flex flex-col p-4 w-1/3 gap-2 border border-slate-300 rounded-md">
          <div className="flex justify-center border-b border-slate-400">
            <h1 className="text-2xl font-bold pb-3">Recover Password</h1>
          </div>
          <div className="flex">
            <form action="" className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  className="border outline-none border-slate-400 rounded-md px-2 py-1 focus:shadow focus:shadow-blue-400"
                />
              </div>
              <div className="flex justify-center">
                <button type='submit' className="px-4 py-2 w-full bg-yellow-500 rounded-md hover:bg-yellow-400">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword