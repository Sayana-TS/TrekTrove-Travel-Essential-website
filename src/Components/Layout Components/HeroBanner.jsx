import React from 'react'
import { Link } from 'react-router-dom'

function HeroBanner() {
    return (
        <section className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/33453969/pexels-photo-33453969.jpeg')" }}>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Explore Your Travel Essentials
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Pack smart, travel light, and enjoy the journey.
                </p>
                <button className="px-6 py-3 bg-[#91b474] cursor-pointer text-black font-semibold rounded-lg shadow-md hover:bg-[#606b57] transition duration-300 ease-in-out">
                    <Link to='/collections'>Shop Now</Link>
                </button>
            </div>
        </section>
    )
}

export default HeroBanner