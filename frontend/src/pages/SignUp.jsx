import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const handelVisiblePassword = () => {

    }
    return (
        <div
            className="w-full h-screen bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form className="w-[90%] h-[600px] max-w-[500px] bg-[#00000042] backdrop-blur shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px] ">
                <h1 className="text-white text-[30px] font-semibold">
                    Register to <span className="text-blue-400">Virtual Assistant</span>
                </h1>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
                />
                <div className="w-full h-[60px]  border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
                    <input
                        type={showPassword ? "text" : 'password'}
                        placeholder="password"
                        className="w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-[20px] py-[10px]"
                    />
                    {
                        !showPassword && <IoEye
                            className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white"
                            onClick={() => setShowPassword(true)}
                        />
                    }
                    {
                        showPassword && <IoEyeOff
                            className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white"
                            onClick={() => setShowPassword(false)}
                        />
                    }
                </div>
            </form>
        </div>
    );
}

export default SignUp;
