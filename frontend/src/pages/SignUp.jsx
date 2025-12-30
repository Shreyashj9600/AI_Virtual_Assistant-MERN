import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext";
import axios from "axios";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const { serverUrl } = useContext(userDataContext)

    const [err, setErr] = useState('')

    const handleSignUP = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, {
                name, email, password
            }, { withCredentials: true })
            setLoading(false)
            console.log(result.data)
        } catch (error) {
            setLoading(false)
            console.log(error)
            setErr(error.response.data.message)
        }
    }

    return (
        <div
            className="w-full h-screen bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form className="w-[90%] h-150 max-w-125 bg-[#00000042] backdrop-blur shadow-black flex flex-col items-center justify-center gap-5 px-5 "
                onSubmit={handleSignUP}
            >
                <h1 className="text-white text-[30px] font-semibold">
                    Register to <span className="text-blue-400">Virtual Assistant</span>
                </h1>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoComplete="email"
                    required
                />
                <div className="w-full h-15  border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="w-full h-full rounded-full outline-none bg-transparent  placeholder-gray-300 px-5 py-2.5"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        autoComplete="current-password"
                        required
                    />
                    {!showPassword && (
                        <IoEye
                            className="absolute top-4.5 right-5 w-6.25 h-6.25 text-white cursor-pointer"
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                    {showPassword && (
                        <IoEyeOff
                            className="absolute top-4.5 right-5 w-6.25 h-6.25 text-white cursor-pointer"
                            onClick={() => setShowPassword(false)}
                        />
                    )}
                </div>
                {err.length > 0 && <p className="text-red-500">*{err}</p>}
                <button disabled={loading} className="min-w-37.5 h-15 text-\[18px\] bg-white rounded-full text-black font-semibold text-\[19px\] ">
                    {loading? "Loading" : "Sign Up"}
                </button>
                <p
                    className="text-[white] cursor-pointer"
                    onClick={() => navigate("/signin")}
                >
                    Already have an account ?{" "}
                    <span className="text-blue-400">Sign In</span>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
