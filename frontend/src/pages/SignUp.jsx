import React from "react";
import bg from "../assets/authBg.png";

function SignUp() {
    return (
        <div
            className="w-full h-screen bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form className="w-[90%] h-[600px] max-w-[500px] bg-[#00000042] backdrop-blur shadow-black flex flex-col items-center justify-center gap-[20px]">
                <h1 className="text-white text-[30px] font-semibold">Register to <span className="text-blue-400">Virtual Assistant</span></h1>
                input
            </form>
        </div>
    );
}

export default SignUp;
