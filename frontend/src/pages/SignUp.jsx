import React, { useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(name, email, password)

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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <div className="w-full h-[60px]  border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-[20px] py-[10px]"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    {!showPassword && (
                        <IoEye
                            className="absolute top-4.5 right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                    {showPassword && (
                        <IoEyeOff
                            className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
                            onClick={() => setShowPassword(false)}
                        />
                    )}
                </div>
                <button className="min-w-[150px] h-[60px] text-[18px] bg-white rounded-full text-black font-semibold text-[19px] ">
                    Sign Up
                </button>
                <p className="text-[white] cursor-pointer"
                    onClick={() => navigate('/signin')}
                >
                    Already have an account ?{" "}
                    <span className="text-blue-400">Sign In</span>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
