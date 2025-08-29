import { useState } from "react";
import {ChevronRight, ChevronLeft} from 'lucide-react'

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Verified Traveler",
    review:
      "The backpack was a lifesaver on my Europe trip — lightweight and super durable!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    product:
      "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/13314476/2025/7/11/ebb22c47-7234-4d5e-bdf5-4305cfff51271752230263724-FORCLAZ-By-Decathlon-Unisex-Orche-Mt100-70L-Trekking-Bag-501-1.jpg", // backpack
  },
  {
    name: "Sophia Thomas",
    role: "Verified Traveler",
    review:
      "Absolutely loved the travel pillow I ordered! Made my 12-hour flight so comfortable.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    product:
      "https://nutcaseshop.com/cdn/shop/files/NC-CUS-PILLOWTRV-BLUE-007C.jpg?v=1723012742&width=1445", // pillow
  },
  {
    name: "Daniel Williams",
    role: "Verified Traveler",
    review:
      "The waterproof jacket kept me dry through unexpected rainstorms in Thailand. Highly recommend!",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    product:
      "https://contents.mediadecathlon.com/p2583866/11e22a86dd99b5813e3ddf0450822831/p2583866.jpg", // jacket
  },
  {
    name: "Emma Johnson",
    role: "Verified Traveler",
    review:
      "This travel adapter was a game-changer — worked perfectly in all the countries I visited!",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    product:
      "https://www.portronics.com/cdn/shop/files/Portronics_Juicemate_20W_Type-C_PD_outlet_adapter.jpg?v=1733224083", // adapter
  },
];

function Testimonial() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 2) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? (testimonials.length - 2) : prev - 2
    );
  };

  return (
    <section id="reviews" className="w-full min-h-screen bg-gray-900 text-white px-6 py-20">
      {/* Top Row - Heading + Arrows */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">🌍 Travelers <span className="text-[#91b474] font-style: italic">love us</span></h2>
        <div className="space-x-3">
          <button
            onClick={prevSlide}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.slice(current, current + 2).map((t, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 bg-gray-800 rounded-2xl overflow-hidden h-[90vh] 
             shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-gray-600 
             transition-all duration-500"
          >
            {/* Product Image Card */}
            <div className="w-full h-full ">
              <img
                src={t.product}
                alt="product"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Review Card */}
            <div className="flex flex-col justify-center items-center p-8 text-center bg-gray-900">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-gray-700"
              />
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{t.role}</p>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
              </div>

              <p className="text-lg italic max-w-md">"{t.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
