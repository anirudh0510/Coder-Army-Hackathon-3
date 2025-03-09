import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const url = "https://analytics-xi-five.vercel.app/api/events";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer qy29i1lkuq1gxy6kiaxdo",
};
const eventData = {
  name: "Learn More", //* required
  domain: "algorithms-visualiser.vercel.app", //* required
  description: "user wants to learn more about project", //optional
};

const sendRequest = async () => {
  axios
    .post(url, eventData, { headers })
    .then()
    .catch((error) => {
      console.error("Error:", error);
    });
};

function Card(props) {
  return (
    <div className="flex flex-col items-center h-[300px] w-[280px] p-4  bg-white shadow-sm shadow-slate-500 border-solid border-slate-300 rounded-2xl mt-4 mb-6 hover:scale-110 transition duration-500">
      <div className="h-[60px] w-[60px] bg-[#FF6F61] rounded-full flex items-center justify-center mb-[4px]">
        <i class={props.source}></i>
      </div>
      <h1 className="text-lg font-semibold text-blue-950 mb-[6px]">
        {props.title}
      </h1>
      <p className="text-gray-700 text-sm pl-2">{props.content}</p>
      <button
        className="px-4 mx-7 my-7  text-blue-950 border-solid border-[1.5px] border-[#FF6F61] text-xs rounded-2xl py-[8px] font-semibold shadow-sm hover:bg-[#FF6F61] hover:text-white"
        onClick={sendRequest}
      >
        <Link to={props.text}>Learn More</Link>{" "}
      </button>
    </div>
  );
}

export default Card;
