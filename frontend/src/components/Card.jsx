import React from 'react'

function Card({ image }) {
    return (
        <div className='w-[70px] h-[160px] lg:w-[150px] lg:h-[240px] bg-[#02021e] border-2 border-[#0000ff8d] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white'>
            <img src={image} className='h-full object-cover' />
        </div>
    )
}

export default Card
