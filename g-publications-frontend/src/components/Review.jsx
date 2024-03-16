import React from "react";
import profile from "../assets/profile.png";
import ReviewSystem from "./ReviewSystem";

const Review = ({name, title, content, date_review, rating}) => {
  let dateIso = new Date(date_review).toUTCString();
  dateIso = dateIso.substring(5, 16);
  return (
    <>
      <div className="border-b border-slate-400 py-4 ">
        <div>
          <div>
            <div className="flex gap-3 items-center">
              <img
                className="rounded-full w-8 h-8"
                src={profile}
                alt="author img"
              />
              <p>{name}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center"> <ReviewSystem value={rating} editable={false}/></div>
              <p className="font-semibold items-center">{title}</p>
            </div>
            <div className="text-slate-500">
              <p>Review in UK on {dateIso}</p>
            </div>
            <div>
              <p className="content">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
