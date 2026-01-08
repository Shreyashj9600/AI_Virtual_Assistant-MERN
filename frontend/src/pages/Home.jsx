import React, { useContext } from "react";
import { userDataContext } from "../context/userContext";

function Home() {
  const { userData } = useContext(userDataContext);
  return (
    <div className="w-full h-screen bg-linear-to-t from-black to-[#030353] flex justify-center items-center flex-col gap-3.75 ">
      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold absolute top-5 right-5 bg-white rounded-full text-[19px] "
      >
        Log Out
      </button>

      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white absolute top-25 right-5 rounded-full text-[19px] px-5 py-2.5 "
      >
        Customize your Assistant
      </button>

      <div className="w-75 h-100 flex justify-center items-center overflow-hidden rounded-4xl shadow-lg ">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-[18px] font-semibold">
        I'm {userData?.assistantName}{" "}
      </h1>
    </div>
  );
}

export default Home;
