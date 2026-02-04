import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import aiImg from '../assets/ai.gif';
import userImg from '../assets/user.gif'
import { AiOutlineMenu } from "react-icons/ai";

function Home() {
  const { userData, setUserData, serverUrl, getGeminiResponse } = useContext(userDataContext);

  const navigate = useNavigate()

  const [listening, setListening] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const synth = window.speechSynthesis
  const isProcessingRef = useRef(false)

  const [userText, setUserText] = useState('')
  const [aiText, setAiText] = useState('')


  const handelLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate('/signin')
    } catch (error) {
      setUserData(null)
      console.log(error)
    }
  }

  const startRecognition = () => {
    if (
      recognitionRef.current &&
      !isSpeakingRef.current &&
      !isProcessingRef.current
    ) {
      try {
        recognitionRef.current.start();
        console.log("Recognition restarted");
      } catch (err) {
        console.log("Already listening");
      }
    }
  }

  const speak = (text) => {
    if (!text) return;

    // 🔓 unlock audio
    window.speechSynthesis.resume();

    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;

    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      startRecognition();
    };

    synth.speak(utterance);

    console.log("Speaking:", text);
  };

  const handelCommand = (data) => {
    const { type, userInput, response } = data

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
    if (data?.type === "calculator-open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }
    if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, '_blank');
    }
    if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, '_blank');
    }
    if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }
    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        '_blank'
      );
    }
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognitionRef.current = recognition

    const isRecognizingRef = { current: false }

    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };

    const safeRecognition = () => {
      if (
        !isSpeakingRef.current &&
        !isRecognizingRef.current &&
        !isProcessingRef.current
      ) {
        try {
          recognition.start()
          console.log('recognition requested to start')
        } catch (error) {
          console.log('start error', error.message);
        }
      }
    }

    recognition.onstart = () => {
      console.log('Recognition started');
      isRecognizingRef.current = true
      setListening(true)
    }

    recognition.onend = () => {
      console.log('Recognition ended');
      isRecognizingRef.current = false
      setListening(false)
    }

    if (!isSpeakingRef.current) {
      setTimeout(() => {
        safeRecognition()
      }, 1000);
    }

    recognition.onerror = (event) => {
      if (event.error === "aborted") {
        // This is expected when we stop recognition manually
        return;
      }

      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);

      setTimeout(() => {
        safeRecognition();
      }, 1000);
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()
      console.log("You said:", transcript);

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText('')
        isProcessingRef.current = true
        setUserText(transcript)
        isRecognizingRef.current = false
        setListening(false)

        setTimeout(() => recognition.abort(), 300)

        const data = await getGeminiResponse(transcript)
        setUserText('')
        setAiText(data.response)
        console.log("Gemini data:", data)
        if (data?.response) {
          setTimeout(() => {
            speak(data.response)
            isProcessingRef.current = false
          }, 500)
        } else {
          isProcessingRef.current = false
        }

        handelCommand(data)
      }
    }

    // const fallback = setInterval(() => {
    //   if (!isSpeakingRef.current && !isRecognizingRef.current) {
    //     safeRecognition()
    //   }
    // }, 10000)
    
    safeRecognition()

    return () => {
      recognition.stop()
      setListening(false)
      isRecognizingRef.current = false
      // clearInterval(fallback)
    }

  }, [])

  return (
    <div className="w-full h-screen bg-linear-to-t from-black to-[#030353] flex justify-center items-center flex-col gap-3.75 ">
      <AiOutlineMenu className="lg:hidden text-white absolute top-5 right-5 w-6.25 h-6.25" />
      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold cursor-pointer absolute hidden lg:block top-5 right-5 bg-white rounded-full text-[19px] "
        onClick={handelLogOut}
      >
        Log Out
      </button>

      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold cursor-pointer  bg-white absolute top-25 right-5 rounded-full text-[19px] px-5 py-2.5 hidden lg:block "
        onClick={() => navigate('/customize')}
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
      {!aiText && <img src={userImg} className="w-50 " />}
      {aiText && <img src={aiImg} className="w-50 " />}

      <h1 className="text-white text-[18px]">{userText ? userText : aiText ? aiText : null}</h1>

      // Enable Voice
      {/* <button
        onClick={() => {
          window.speechSynthesis.resume();
          alert("Voice unlocked   Now say: Hello Jarvis");
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Enable Voice
      </button> */}
    </div>
  );
}

export default Home;
