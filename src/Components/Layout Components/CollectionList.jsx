import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function CollectionList() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // fetch all categories
        const categoriesSnap = await getDocs(collection(db, "Categories"));
        let cats = categoriesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // fetch all products
        const productsSnap = await getDocs(collection(db, "Products"));
        const products = productsSnap.docs.map((doc) => doc.data());

        // add count of products per category
        cats = cats.map((cat) => {
          const count = products.filter(
            (prod) => prod.category === cat.title
          ).length;
          return { ...cat, count };
        });

        // shuffle and pick 4
        const shuffled = cats.sort(() => 0.5 - Math.random());
        setCategories(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="collection" className="bg-[#5D6B52] py-16">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        {categories.map((cat, index) => {
          const isActive = index === activeIndex;

          return (
            <Link 
              to={`/collections/${cat.title}`}
              key={cat.id}
            >
              <div
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(0)}
                className="flex items-center justify-between border-b  border-white/20 rounded-2xl p-6 transition cursor-pointer "
              >
                {/* Left: Text */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    {cat.count} products
                  </p>
                </div>

                {/* Right: Thumbnail */}
                <div className="w-40 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105
                      ${isActive ? "grayscale-0" : "grayscale hover:grayscale-0"}
                    `}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All */}
      <div className="text-center mt-12 text-white">
        <Link to="/collections">
          <button className="px-8 py-3 border border-gray-300 hover:border-white rounded-full transition cursor-pointer">
            View all products
          </button>
        </Link>
      </div>
    </section>
  );
}

export default CollectionList;
