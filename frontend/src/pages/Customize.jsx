import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const inputImage = useRef();

  const navigate = useNavigate();

  const handelImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full h-screen bg-linear-to-t from-black to-[#030353] flex justify-center items-center flex-col p-10  ">
      <h1 className="text-white text-[30px] text-center mb-10 ">
        Select your <span className="text-blue-300">Assistant Image </span>
      </h1>
      <div className="w-[90%] max-w-225 flex justify-center items-center flex-wrap gap-3.75 ">
        <Card image={image1} />
        {/* <Card image={image2} /> */}
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div
          className={`w-17.5 h-35 lg:w-37.5 lg:h-62.5 bg-[#02021e] border-2 border-[#0000ff8d] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center ${
            selectedImage == "input"
              ? "border-4 border-white shadow-2xl shadow-blue-950"
              : null
          }`}
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage && (
            <RiImageAddLine className="w-6.25 h-6.25 text-white" />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handelImage}
        />
      </div>
      {selectedImage && (
        <button
          onClick={() => navigate("customize2")}
          className="min-w-37.5 h-15 text-\[18px\] bg-white rounded-full text-black font-semibold text-\[19px\] mt-1  "
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
