import React from 'react'
import Card from '../components/Card'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { RiImageAddLine } from "react-icons/ri";

const Customize = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col">
      <div className='w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[20px] '>
        <Card image={image1} />
        {/* <Card image={image2} /> */}
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />

        <div className='w-[150px] h-[250px] bg-[#02021e] border-2 border-[#0000ff8d] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center'>
          <RiImageAddLine className='w-[25px] h-[25px] text-white' />
        </div>

      </div>
    </div>
  )
}

export default Customize
