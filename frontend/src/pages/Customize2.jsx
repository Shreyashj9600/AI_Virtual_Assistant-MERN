import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/userContext'

const Customize2 = () => {

    const { userData } = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
    return (
        <div className="w-full h-screen bg-linear-to-t from-black to-[#030353] flex justify-center items-center flex-col p-10  ">

            <h1 className="text-white text-[30px] text-center mb-10 ">
                Enter your <span className="text-blue-300">Assistant Name </span>
            </h1>
            <input
                type="text"
                placeholder="eg.Aiva"
                onChange={(e) => setAssistantName(e.target.value)}
                value={assistantName}
                className="w-full max-w-150 h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px]"
                required
            />
            {
                assistantName && <button
                    onClick={() => navigate("/customize2")}
                    className="min-w-70.5 h-15 text-\[18px\] bg-white rounded-full text-black font-semibold text-\[19px\] mt-8 cursor-pointer  "
                >
                    Finally Create Your Assistant
                </button>
            }

        </div>
    )
}

export default Customize2
