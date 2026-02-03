import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Customize2 = () => {
    const { userData, backendImage, selectedImage, serverUrl, setUserData } =
        useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(
        userData?.AssistantName || ""
    );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handelUpdateAssistant = async () => {
        setLoading(true)
        try {
            let formData = new FormData();
            formData.append("assistantName", assistantName);
            if (backendImage) {
                formData.append("assistantImage", backendImage);
            } else {
                formData.append("imageUrl", selectedImage);
            }
            const result = await axios.post(
                `${serverUrl}/api/user/update`,
                formData,
                { withCredentials: true }

            );
            setLoading(false)
            console.log(result.data);
            setUserData(result.data);
            navigate('/')
        } catch (error) {
            setLoading(false)
            setUserData(error);
        }
    };
    return (
        <div className="w-full h-screen bg-linear-to-t from-black to-[#030353] flex justify-center items-center flex-col p-10 relative">
            <IoArrowBackOutline className="absolute top-7.5 left-7.5 w-6.25 h-6.25 text-white" onClick={() => navigate('/customize')} />
            <h1 className="text-white text-[30px] text-center mb-10 ">
                Enter your <span className="text-blue-300">Assistant Name </span>
            </h1>
            <input
                type="text"
                placeholder="Eg.Aiva"
                onChange={(e) => setAssistantName(e.target.value)}
                value={assistantName}
                className="w-full max-w-150 h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
                required
            />
            {assistantName && (
                <button
                    onClick={() => {
                        handelUpdateAssistant();
                    }}
                    className="min-w-70.5 h-15 text-\[18px\] bg-white rounded-full text-black font-semibold text-\[19px\] mt-8 cursor-pointer"
                    disabled={loading}
                >
                    {!loading ? "Finally Create Your Assistant" : 'Loading...'}
                </button>
            )}
        </div>
    );
};

export default Customize2;
