// src/pages/CollectionsPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import CollectionCard from "../Components/Product Components/CollectionCard";
import { Link } from "react-router-dom";
import GoBackButton from "../Components/Common Components/GoBackButton";

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCategoriesWithCount = async () => {
      const categoriesSnapshot = await getDocs(collection(db, "Categories"));
      const categoriesData = [];

      for (let catDoc of categoriesSnapshot.docs) {
        const category = { id: catDoc.id, ...catDoc.data() };

        // count how many products belong to this category
        const productsQuery = query(
          collection(db, "Products"),
          where("category", "==", category.title)
        );
        const productsSnapshot = await getDocs(productsQuery);

        category.itemsCount = productsSnapshot.size; // number of products
        categoriesData.push(category);
      }

      setCollections(categoriesData);
    };

    fetchCategoriesWithCount();
  }, []);

  return (
    <div className="bg-[#282928] min-h-screen">
      <div className="px-8 py-12">
        <GoBackButton />
        <h2 className="text-3xl font-bold text-white mb-8">Collections</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <Link key={col.id} to={`/collections/${col.title}`}>
              <CollectionCard
                title={col.title}
                image={col.image}
                items={col.itemsCount} // now dynamic 🚀
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
