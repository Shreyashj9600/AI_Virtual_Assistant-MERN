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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const { serverUrl, userData, setUserData } = useContext(userDataContext)

    const [err, setErr] = useState('')

    const handleSignIn = async (e) => {
        e.preventDefault()
        setErr("")
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email, password
            }, { withCredentials: true })
            setUserData(result.data)
            setLoading(false)
            navigate('/')
        } catch (error) {
            setUserData(null)
            console.log(error)
            setErr(error.response.data.message)
            setLoading(false)
        }
    }

    return (
        <div
            className="w-full h-screen bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form className="w-[90%] h-150 max-w-125 bg-[#00000042] backdrop-blur shadow-black flex flex-col items-center justify-center gap-5 px-5 "
                onSubmit={handleSignIn}
            >
                <h1 className="text-white text-[30px] font-semibold">
                    Sign to <span className="text-blue-400">Virtual Assistant</span>
                </h1>

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
                <button className="min-w-37.5 h-15 text-\[18px\] bg-white rounded-full text-black font-semibold text-\[19px\] " disabled={loading}>
                    {loading ? "loading..." : "Sign In"}
                </button>
                <p
                    className="text-[white] cursor-pointer"
                    onClick={() => navigate("/signup")}
                >
                    want to create a new account ?{" "}
                    <span className="text-blue-400">Sign Up</span>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
