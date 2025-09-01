// src/components/Testimonial.jsx
import { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { ChevronRight, ChevronLeft } from "lucide-react";

function Testimonial() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  // Fetch reviews + related product info
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(10));
        const querySnap = await getDocs(q);

        const reviewPromises = querySnap.docs.map(async (revDoc) => {
          const revData = revDoc.data();
          const productRef = doc(db, "Products", revData.productId);
          const productSnap = await getDoc(productRef);

          return {
            id: revDoc.id,
            ...revData,
            product: productSnap.exists() ? productSnap.data() : null,
          };
        });

        const reviewsWithProducts = await Promise.all(reviewPromises);
        setReviews(reviewsWithProducts);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchReviews();
  }, []);

  const nextSlide = () => {
  if (reviews.length === 0) return;
  setCurrent((prev) => {
    const nextIndex = prev + 2;
    return nextIndex >= reviews.length ? 0 : nextIndex;
  });
};

const prevSlide = () => {
  if (reviews.length === 0) return;
  setCurrent((prev) => {
    const prevIndex = prev - 2;
    return prevIndex < 0 ? (reviews.length % 2 === 0 ? reviews.length - 2 : reviews.length - 1) : prevIndex;
  });
};


  return (
    <section id="reviews" className="w-full min-h-screen bg-gray-900 text-white px-6 py-20">
      {/* Top Row - Heading + Arrows */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          🌍 Travelers <span className="text-[#91b474] italic">love us</span>
        </h2>
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
        {reviews.slice(current, current + 2).map((rev) => (
          <div
            key={rev.id}
            className="grid grid-cols-1 md:grid-cols-2 bg-gray-800 rounded-2xl overflow-hidden h-[90vh] 
              shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-gray-600 transition-all duration-500"
          >
            {/* Product Image */}
            <div className="w-full h-full">
              {rev.product?.image ? (
                <img
                  src={rev.product.image}
                  alt={rev.product.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Product Image
                </div>
              )}
            </div>

            {/* Review Card */}
            <div className="flex flex-col justify-center items-center p-8 text-center bg-gray-900">
              <h3 className="text-xl font-semibold">{rev.userName}</h3>
              <p className="text-sm text-gray-400 mb-3">Verified Traveler</p>

              {/* Stars */}
              <div className="flex justify-center mb-4">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span
                      key={i}
                      className={i < rev.rating ? "text-yellow-400 text-lg" : "text-gray-500 text-lg"}
                    >
                      ★
                    </span>
                  ))}
              </div>

              <p className="text-lg italic max-w-md">"{rev.comment}"</p>
              {rev.product?.title && (
                <p className="mt-4 text-gray-400 text-sm">– {rev.product.title}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
